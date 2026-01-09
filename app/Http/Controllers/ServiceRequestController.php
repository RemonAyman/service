<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\Technician;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    // عرض كل الطلبات
    public function index()
    {
        $requests = ServiceRequest::with(['user', 'technician', 'service'])->paginate(10);
        return view('service_requests.index', compact('requests'));
    }

    // صفحة إنشاء طلب جديد
    public function create()
    {
        $users = User::all();
        $technicians = Technician::all();
        $services = Service::all();
        return view('service_requests.create', compact('users', 'technicians', 'services'));
    }

    // حفظ طلب جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id'            => 'nullable|integer|unique:service_requests,id',
            'user_id'       => 'required|exists:users,id',
            'technician_id' => 'nullable|exists:technicians,id',
            'service_id'    => 'required|exists:services,id',
            'status'        => 'required|string|in:pending,in_progress,completed',
        ]);

        ServiceRequest::create($validated);

        return redirect()->route('service_requests.index')->with('success', 'Service request created successfully');
    }

    // عرض طلب واحد
    public function show($id)
    {
        $request = ServiceRequest::with(['user', 'technician', 'service'])->findOrFail($id);
        return view('service_requests.show', compact('request'));
    }

    // صفحة تعديل الطلب
    public function edit($id)
    {
        $request = ServiceRequest::findOrFail($id);
        $users = User::all();
        $technicians = Technician::all();
        $services = Service::all();
        return view('service_requests.edit', compact('request', 'users', 'technicians', 'services'));
    }

    // تحديث الطلب
    public function update(Request $request, $id)
    {
        $requestModel = ServiceRequest::findOrFail($id);

        $validated = $request->validate([
            'id'            => 'nullable|integer|unique:service_requests,id,' . $requestModel->id,
            'user_id'       => 'required|exists:users,id',
            'technician_id' => 'nullable|exists:technicians,id',
            'service_id'    => 'required|exists:services,id',
            'status'        => 'required|string|in:pending,in_progress,completed',
        ]);

        $requestModel->update($validated);

        return redirect()->route('service_requests.index')->with('success', 'Service request updated successfully');
    }

    // حذف الطلب
    public function destroy($id)
    {
        $requestModel = ServiceRequest::findOrFail($id);
        $requestModel->delete();

        return redirect()->route('service_requests.index')->with('success', 'Service request deleted successfully');
    }
}
