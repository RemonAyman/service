<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
   
         public function index()
    {
        $services = Service::with('category')->paginate(10);
        $data = [
            "msg" => "Return all Data",
            "status" => 200,
            "services" => $services,
        ];
        return response()->json($data); 
    }

    public function show($id)
    {
        $service = Service::with('category', 'serviceRequests')->find($id);
        if ($service) {
            $data = [
                "msg" => "Return all Data",
                "status" => 200,
                "service" => $service,
            ];
            return response()->json($data);
        } else {
            $data = [
                "msg" => "No Such ID",
                "status" => 201,
                "service" => null
            ];
            return response()->json($data);
        }
    }
    public function delete($id)
    {
        $service = Service::find($id);
        if ($service) {
            $service->delete();
            $data = [
                "msg" => "Service Deleted Successfully",
                "status" => 200,
            ];
            return response()->json($data);
        } else {
            $data = [
                "msg" => "No Such ID",
                "status" => 201,
            ];
            return response()->json($data);
        }
    }
      public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'nullable|integer|unique:services,id',
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric|min:0',
            'estimated_time' => 'required|string|max:100',
            'category_id'    => 'required|exists:categories,id',
            ]);

    if ($validator->fails()) {
        return response()->json([
            'msg' => 'Validation Error',
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    }

    Service::create([
        'id'             => $request->id,
        'name'           => $request->name,
        'description'    => $request->description,
        'price'          => $request->price,
        'estimated_time' => $request->estimated_time,
        'category_id'    => $request->category_id,
    ]);

    return response()->json([
        'msg' => 'Service Created Successfully',
        'status' => 200,
        'service' => null
    ], 200);
}
public function update(Request $request)
{
    $service = Service::find($request->old_id);

    if (!$service) {
        return response()->json([
            'msg' => 'No Such ID',
            'status' => 201,
            'service' => null
        ], 201);
    }

    $validator = Validator::make($request->all(), [
        'id'             => 'nullable|integer|unique:services,id,' . $service->id,
        'name'           => 'required|string|max:255',
        'description'    => 'nullable|string',
        'price'          => 'required|numeric|min:0',
        'estimated_time' => 'required|string|max:100',
        'category_id'    => 'required|exists:categories,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'msg' => 'Validation Error',
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    }

    $service->update([
        'id'             => $request->id,
        'name'           => $request->name,
        'description'    => $request->description,
        'price'          => $request->price,
        'estimated_time' => $request->estimated_time,
        'category_id'    => $request->category_id,
    ]);
    return response()->json([
        'msg' => 'Service Updated Successfully',
        'status' => 200,
        'service' => null
    ], 200);
} 


}