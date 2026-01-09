<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceRequestController extends Controller
{
    
         public function index()
    {
        
        $requests = ServiceRequest::with(['user', 'technician', 'service'])->paginate(10);
        $data = [
            'status' => 'success',
            'data' => $requests,
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
        'service_id'    => 'required|exists:services,id',
        'status'        => 'required|string|in:pending,in_progress,completed',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors(),
            'message' => 'Validation failed'
        ], 422);
    }

    // إنشاء الطلب بعد التحقق من صحة البيانات
    $serviceRequest = ServiceRequest::create($validator->validated());

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
            'user_id'       => 'required|exists:users,id',
            'technician_id' => 'nullable|exists:technicians,id',
            'service_id'    => 'required|exists:services,id',
            'status'        => 'required|string|in:pending,in_progress,completed',
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
