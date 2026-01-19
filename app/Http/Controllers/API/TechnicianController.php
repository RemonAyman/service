<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TechnicianController extends Controller
{
    public function index(Request $request)
    {
        $query = Technician::with(['user', 'category','serviceRequests','reviews']);
        
        // Filter by category_id if provided
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by mode (real vs guest/seeded)
        if ($request->has('mode')) {
            if ($request->mode === 'real') {
                $query->whereHas('user', function($q) {
                    $q->where('email', 'not like', '%@services.com');
                });
            } elseif ($request->mode === 'guest') {
                $query->whereHas('user', function($q) {
                    $q->where('email', 'like', '%@services.com');
                });
            }
        }
        
        $technicians = $query->latest()->get();
        
        $data = [
            "msg"   => "Return all Data",
            "status"   => 200,
            "technicians"   => $technicians,
        ];
        return response()->json($data);  
    }
    public function show($id)
    {
        $technicians = Technician::with(['user', 'category','serviceRequests','reviews'])->find($id);
        if ($technicians) {
            $data = [

                "msg" => "Return all Data",
                "status" => 200,
                "technician" => $technicians,
            ];
            return response()->json($data);
        } else {
            $data = [

                "msg"   => "No Such ID",
                "status"   => 201,
                "technician"   => null
            ];
            return response()->json($data);
        }
    }
    public function delete($id)
    {
        $technicians = Technician::find($id);
        if ($technicians) {
            $technicians->delete();
            $data = [

                "msg"   => "Deleted Successfully",
                "status"   => 200,
                "technician"   => null
            ];
            return response()->json($data);
        } else {
            $data = [
                "msg"   => "No Such ID",
                "status"   => 201,
                "technician"   => null
            ];
            return response()->json($data);
           }  
         }

   public function store(Request $request)
{
    // تحويل أي قيمة جاية لـ 0 أو 1
    $request->merge([
        'is_available' => filter_var($request->is_available ?? false, FILTER_VALIDATE_BOOLEAN)
    ]);

    $validator = Validator::make($request->all(), [
        'id' => 'required|integer|unique:technicians,id',
        'user_id' => 'required|exists:users,id',
        'category_id' => 'required|exists:categories,id',
        'experience_years' => 'required|integer|min:0',
        'rating' => 'nullable|numeric|min:0|max:5',
        'is_available' => 'required|boolean',
        'hourly_rate' => 'nullable|numeric|min:0',
        'city' => 'nullable|string|max:255',
        'bio' => 'nullable|string',
        'availability' => 'nullable',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'msg' => 'Validation Error',
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    }

    Technician::create([
        'id' => $request->id,
        'user_id' => $request->user_id,
        'category_id' => $request->category_id,
        'experience_years' => $request->experience_years,
        'rating' => $request->rating ?? 0,
        'is_available' => $request->is_available,
        'hourly_rate' => $request->hourly_rate,
        'city' => $request->city,
        'bio' => $request->bio,
        'availability' => $request->availability,
    ]);

    return response()->json([
        'msg' => 'Technician Created Successfully',
        'status' => 200,
        'technician' => null
    ], 200);
}
public function update(Request $request)
{
    $old_id = $request->old_id;
    $technicians = Technician::find($old_id);

    if (!$technicians) {
        return response()->json([
            'msg' => 'No Such ID',
            'status' => 201,
            'technician' => null
        ], 201);
    }

    // تحويل أي قيمة جاية لـ 0 أو 1
    $request->merge([
        'is_available' => filter_var($request->is_available ?? false, FILTER_VALIDATE_BOOLEAN)
    ]);

    $validator = Validator::make($request->all(), [
        'id' => 'required|integer|unique:technicians,id,' . $old_id,
        'user_id' => 'required|exists:users,id',
        'category_id' => 'required|exists:categories,id',
        'experience_years' => 'required|integer|min:0',
        'rating' => 'nullable|numeric|min:0|max:5',
        'is_available' => 'required|boolean',
        'hourly_rate' => 'nullable|numeric|min:0',
        'city' => 'nullable|string|max:255',
        'bio' => 'nullable|string',
        'availability' => 'nullable',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'msg' => 'Validation Error',
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    }

    $technicians->update([
        'id' => $request->id,
        'user_id' => $request->user_id,
        'category_id' => $request->category_id,
        'experience_years' => $request->experience_years,
        'rating' => $request->rating ?? 0,
        'is_available' => $request->is_available,
        'hourly_rate' => $request->hourly_rate,
        'city' => $request->city,
        'bio' => $request->bio,
        'availability' => $request->availability,
    ]);

    return response()->json([
        'msg' => 'Technician Updated Successfully',
        'status' => 200,
        'technician' => null
    ], 200);
}
}