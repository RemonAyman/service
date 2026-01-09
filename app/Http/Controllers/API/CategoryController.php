<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\File\File;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = CategoryResource::collection(Category::all());
        $data = [

            "msg"   => "Return all Data",
            "status"   => 200,
            "categories"   => $categories,
        ];
        return response()->json($data);
    }
    public function show($id)
    {
        $categories = Category::find($id);
        if ($categories) {
            $data = [

                "msg" => "Return all Data",
                "status" => 200,
                "category" => new CategoryResource($categories),
            ];
            return response()->json($data);
        } else {
            $data = [

                "msg"   => "No Sach ID",
                "status"   => 201,
                "category"   => null
            ];
            return response()->json($data);
        }
    }
    public function delete($id)
    {
        $categories = Category::find($id);
         if($categories && $categories->image){
            if(FacadesFile::exists(public_path('/img/category/'. $categories->image))){
                FacadesFile::delete(public_path('/img/category/'. $categories->image));
            }
        }
        if ($categories) {
            $categories->delete();

            $data = [
                "msg" => "Deleted Successfully",
                "status" => 200,
                "category" => null,
            ];
            return response()->json($data);
        } else {
            $data = [

                "msg"   => "No Sach ID",
                "status"   => 201,
                "category"   => null
            ];
            return response()->json($data);
        }
    }

    public function store(Request $request)
    {
         $validator = FacadesValidator::make($request->all(), [
            'image' => 'required|max:2048|mimes:png,jpeg,webp',
            'id' => 'required|integer|unique:categories,id',
            'name' => 'required',
            'description' => 'required',

        ]);
        if ($validator->fails()) {
            $data = [

                "msg"   => "Validation Msg",
                "status"   => 205,
                "categories"   => $validator->errors(),
            ];
            return response()->json($data);
        }

        if($request->hasFile('image')){
            $image = $request->image;
            $imageName = time() . "_" . rand(1,1000000000) . "." . $image->extension();
            $image->move(public_path("/img/category"),$imageName);
        }
        //
        $newCate =   Category::create(
            [
               "image"=> $imageName,
                "id" => $request->id,
                "name" => $request->name,
                 "description" => $request->description,
            ]
        );
        $data = [

            "msg"   => "Created Successfully ",
            "status"   => 200,
            "category"   => new CategoryResource($newCate),
        ];
        return response()->json($data);
    }

       public function update(Request $request)
{
       $category = Category::find($request->old_id);

    if (!$category) {
        return response()->json([
            'msg' => 'Category not found',
            'status' => 404,
            'category' => null
        ], 404);
    }

    // Validation
    $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
        'id' => [
            'required',
            Rule::unique('categories', 'id')->ignore($category->id),
        ],
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'image' => 'nullable|image|mimes:png,jpeg,webp|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'msg' => 'Validation errors',
            'status' => 422,
            'errors' => $validator->errors(),
        ], 422);
    }

    // Image handling
    $imageName = $category->image; // الصورة القديمة

    if ($request->hasFile('image')) {

        // حذف الصورة القديمة
        if ($imageName && \Illuminate\Support\Facades\File::exists(public_path('img/category/' . $imageName))) {
            \Illuminate\Support\Facades\File::delete(public_path('img/category/' . $imageName));
        }

        // رفع الصورة الجديدة
        $image = $request->file('image');
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/category'), $imageName);
    }

    // Update
    $category->update([
        'id' => $request->id,
        'name' => $request->name,
        'description' => $request->description,
        'image' => $imageName,
    ]);

    return response()->json([
        'msg' => 'Updated Successfully',
        'status' => 200,
        'category' => new CategoryResource($category),
    ], 200);
}

    }