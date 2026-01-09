<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class ReviewController extends Controller
{
     public function index()
    {
        // Eager loading للعلاقات مع User و Technician->User و ServiceRequest
        $reviews = Review::with(['user', 'technician.user', 'serviceRequest'])->paginate(10);
       $data = [
            'status' => 'success',
            'data' => $reviews,
            'message' => 'Reviews retrieved successfully'
        ];
        return response()->json($data, 200);
    }
    public function show($id)
    {
        $review = Review::with(['user', 'technician.user', 'serviceRequest'])->find($id);
        if ($review) {
            $data = [
                'status' => 'success',
                'data' => $review,
                'message' => 'Review retrieved successfully'
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 'error',
                'message' => 'Review not found'
            ];
            return response()->json($data, 404);
        }
    }
    public function store(Request $request)
    {
      $validator = FacadesValidator::make($request->all(), [
            'id'                 => 'nullable|integer|unique:reviews,id',
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id'            => 'required|exists:users,id',
            'technician_id'      => 'nullable|exists:technicians,id',
            'rating'             => 'required|numeric|min:1|max:5',
            'comment'            => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ];
            return response()->json($data, 422);
        }

        $review = Review::create($request->all());

        $data = [
            'status' => 'success',
            'data' => $review,
            'message' => 'Review created successfully'
        ];
        return response()->json($data, 201);
    }
    public function update(Request $request)
    {
        
        $reviewModel = Review::find($request->old_id);
        if (!$reviewModel) {
            $data = [
                'status' => 'error',
                'message' => 'Review not found'
            ];
            return response()->json($data, 404);
        }

        $validator = FacadesValidator::make($request->all(), [
            'id'                 => 'nullable|integer|unique:reviews,id,' . $reviewModel->id,
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id'            => 'required|exists:users,id',
            'technician_id'      => 'nullable|exists:technicians,id',
            'rating'             => 'required|numeric|min:1|max:5',
            'comment'            => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ];
            return response()->json($data, 422);
        }

        $reviewModel->update($request->all());

        $data = [
            'status' => 'success',
            'data' => $reviewModel,
            'message' => 'Review updated successfully'
        ];
        return response()->json($data, 200);
    }
    public function delete($id)
    {
        $reviewModel = Review::find($id);
        if (!$reviewModel) {
            $data = [
                'status' => 'error',
                'message' => 'Review not found'
            ];
            return response()->json($data, 404);
}

        $reviewModel->delete();

        $data = [
            'status' => 'success',
            'message' => 'Review deleted successfully'
        ];
        return response()->json($data, 200);
    }
}