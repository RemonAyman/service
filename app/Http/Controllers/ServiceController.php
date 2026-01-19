<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Category;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Display all services
    public function index()
    {
        // Get services sorted by latest
        $services = Service::latest()->with('category')->paginate(10);
        
        // If API request (from React), return JSON including the Paginator object
        // Paginator serializes to { current_page: 1, data: [...], ... }
        if (request()->wantsJson()) {
            return response()->json([
                'status' => 200,
                'services' => $services, 
            ]); 
        }

        return view('services.index', compact('services'));
    }

    // Show the form to create a new service
    public function create()
    {
        $categories = Category::all();
        return view('services.create', compact('categories'));
    }

    // Store a new service
    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'id' => 'nullable|integer|unique:services,id', // Let DB handle ID auto-increment
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric|min:0',
            'estimated_time' => 'required|string|max:100',
            'category_id'    => 'required|exists:categories,id',
        ]);

        $service = Service::create($validated);

        if (request()->wantsJson()) {
             return response()->json([
                'status' => 200,
                'message' => 'Service created successfully',
                'service' => $service,
            ]);
        }

        return redirect()->route('services.index')->with('success', 'Service created successfully');
    }

    // Show a single service
    public function show($id)
    {
        $service = Service::with('category', 'serviceRequests')->findOrFail($id);
        
        if (request()->wantsJson()) {
             return response()->json([
                'status' => 200,
                'service' => $service,
            ]);
        }
        
        return view('services.show', compact('service'));
    }

    // Show the form to edit a service
    public function edit($id)
    {
        $service = Service::findOrFail($id);
        $categories = Category::all();
        return view('services.edit', compact('service', 'categories'));
    }

    // Update a service
    public function update(Request $request, $id = null)
    {
        // If ID is not passed in route (e.g. from API POST /serviceupdate), get it from request
        if (!$id) {
            $id = $request->input('old_id') ?? $request->input('id');
        }
        
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            // 'id' => 'nullable|integer|unique:services,id,' . $service->id,
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric|min:0',
            'estimated_time' => 'required|string|max:100',
            'category_id'    => 'required|exists:categories,id',
        ]);

        $service->update($validated);

        if (request()->wantsJson()) {
             return response()->json([
                'status' => 200,
                'message' => 'Service updated successfully',
                'service' => $service,
            ]);
        }

        return redirect()->route('services.index')->with('success', 'Service updated successfully');
    }

    // Delete a service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        if (request()->wantsJson()) {
             return response()->json([
                'status' => 200,
                'message' => 'Service deleted successfully',
            ]);
        }

        return redirect()->route('services.index')->with('success', 'Service deleted successfully');
    }
}
