<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Technician;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // عرض كل التقييمات
    public function index()
    {
        // Eager loading للعلاقات مع User و Technician->User و ServiceRequest
        $reviews = Review::with(['user', 'technician.user', 'serviceRequest'])->paginate(10);
        return view('reviews.index', compact('reviews'));
    }

    // صفحة إنشاء تقييم جديد
    public function create()
    {
        $users = User::all();
        $technicians = Technician::all();
        $serviceRequests = ServiceRequest::all();
        return view('reviews.create', compact('users', 'technicians', 'serviceRequests'));
    }

    // حفظ تقييم جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id'                 => 'nullable|integer|unique:reviews,id',
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id'            => 'required|exists:users,id',
            'technician_id'      => 'nullable|exists:technicians,id',
            'rating'             => 'required|numeric|min:1|max:5',
            'comment'            => 'nullable|string|max:500',
        ]);

        Review::create($validated);

        return redirect()->route('reviews.index')->with('success', 'Review created successfully');
    }

    // عرض تقييم واحد
    public function show($id)
    {
        $review = Review::with(['user', 'technician.user', 'serviceRequest'])->findOrFail($id);
        return view('reviews.show', compact('review'));
    }

    // صفحة تعديل تقييم
    public function edit($id)
    {
        $review = Review::findOrFail($id);
        $users = User::all();
        $technicians = Technician::all();
        $serviceRequests = ServiceRequest::all();
        return view('reviews.edit', compact('review', 'users', 'technicians', 'serviceRequests'));
    }

    // تحديث التقييم
    public function update(Request $request, $id)
    {
        $reviewModel = Review::findOrFail($id);

        $validated = $request->validate([
            'id'                 => 'nullable|integer|unique:reviews,id,' . $reviewModel->id,
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id'            => 'required|exists:users,id',
            'technician_id'      => 'nullable|exists:technicians,id',
            'rating'             => 'required|numeric|min:1|max:5',
            'comment'            => 'nullable|string|max:500',
        ]);

        $reviewModel->update($validated);

        return redirect()->route('reviews.index')->with('success', 'Review updated successfully');
    }

    // حذف التقييم
    public function destroy($id)
    {
        $reviewModel = Review::findOrFail($id);
        $reviewModel->delete();

        return redirect()->route('reviews.index')->with('success', 'Review deleted successfully');
    }
}
