<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceRequestController extends Controller
{
    
    public function index(Request $request)
    {
        $query = ServiceRequest::with(['user', 'technician.user', 'service']);
        
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        
        if ($request->has('technician_id')) {
            $query->where('technician_id', $request->technician_id);
        }

        $requests = $query->paginate(10);
        $data = [
            'status' => 'success',
            'serviceRequests' => $requests,
            'message' => 'Service requests retrieved successfully'
        ];
        return response()->json($data);
    }
    public function show($id)
    {
        $request = ServiceRequest::with(['user', 'technician', 'service'])->find($id);
        if ($request) {
            $data = [
                'status' => 'success',
                'data' => $request,
                'message' => 'Service request retrieved successfully'
            ];
        } else {
            $data = [
                'status' => 'error',
                'data' => null,
                'message' => 'Service request not found'
            ];
        }
        return response()->json($data);
    }
    public function delete($id)
    {
        $request = ServiceRequest::find($id);
        if ($request) {
            $request->delete();
            $data = [
                'status' => 'success',
                'message' => 'Service request deleted successfully'
            ];
        } else {
            $data = [
                'status' => 'error',
                'message' => 'Service request not found'
            ];
        }
        return response()->json($data);
    }
    public function store(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'id'            => 'nullable|integer|unique:service_requests,id',
        'user_id'       => 'required|exists:users,id',
        'technician_id' => 'nullable|exists:technicians,id',
        'service_id'    => 'nullable|exists:services,id',
        'status'        => 'required|string|in:pending,accepted,completed',
        'requested_date' => 'required|date',
        'requested_time' => 'required',
        'address'       => 'required|string',
        'phone'         => 'required|string',
        'notes'         => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors(),
            'message' => 'Validation failed'
        ], 422);
    }

    // Auto-assign technician if not provided
    $data = $validator->validated();
    
    if (empty($data['technician_id'])) {
        // We need a service_id to find a relevant technician
        if (empty($data['service_id'])) {
             return response()->json([
                'status' => 'error',
                'message' => 'Service ID is required when no technician is selected.'
            ], 422);
        }

        $service = \App\Models\Service::find($data['service_id']);
        if (!$service) {
             return response()->json([
                'status' => 'error',
                'message' => 'Selected service not found.'
            ], 422);
        }

        // Find technicians in this category
        $query = \App\Models\Technician::where('category_id', $service->category_id)
                    ->where('is_available', true); // Only available techs

        // Optional: Prioritize "Real" technicians (not seeded)
        // We can try to pick a real one first
        $realTechs = clone $query;
        $candidate = $realTechs->whereHas('user', function($q) {
            $q->where('email', 'not like', '%@services.com');
        })->inRandomOrder()->first();

        // If no real tech found, fall back to any tech (seeded/marketing)
        if (!$candidate) {
            $candidate = $query->inRandomOrder()->first();
        }

        if (!$candidate) {
            return response()->json([
                'status' => 'error',
                'message' => 'عذراً، لا يوجد فنيين متاحين حالياً لهذه الخدمة. يرجى المحاولة في وقت لاحق.'
            ], 422);
        }

        $data['technician_id'] = $candidate->id;
    }

    // إنشاء الطلب بعد التحقق من صحة البيانات
    $serviceRequest = ServiceRequest::create($data);

    return response()->json([
        'status' => 'success',
        'data' => $serviceRequest,
        'message' => 'Service request created successfully'
    ]);
    }
    public function update(Request $request)
    {
        $requestModel = ServiceRequest::find($request->old_id);

        if (!$requestModel) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service request not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'id'            => 'nullable|integer|unique:service_requests,id,' . $requestModel->id,
            'user_id'       => 'sometimes|exists:users,id',
            'technician_id' => 'sometimes|exists:technicians,id',
            'service_id'    => 'sometimes|exists:services,id',
            'status'        => 'required|string|in:pending,accepted,rejected,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        // تحديث الطلب بعد التحقق من صحة البيانات
        $requestModel->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $requestModel,
            'message' => 'Service request updated successfully'
        ]);
    }
}
