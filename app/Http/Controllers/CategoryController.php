<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return view("categories.index",compact('categories'));
    }

    public function show($id){
        $categories = Category::find($id);
        return view("categories.show",["categories"=>$categories]);
    }

    public function delete($id){
        $categories = Category::find($id);

        if($categories && $categories->image){
            if(File::exists(public_path('/img/category/'. $categories->image))){
                File::delete(public_path('/img/category/'. $categories->image));
            }
        }

        if($categories){
            $categories->delete();
        }

        return redirect()->route("categories.index")
            ->with("cate" , "Deleted Successfully");
    }

    public function create(){
        return view("categories.create");
    }

    public function store(Request $request){ 

        $request->validate([
            'image' => 'required|max:2048|mimes:png,jpeg,webp',
            'id' => 'required|integer|unique:categories,id',
            'name' => 'required',
            'description' => 'required',
        ]);

        if($request->hasFile('image')){
            $image = $request->image;
            $imageName = time() . "_" . rand(1,1000000000) . "." . $image->extension();
            $image->move(public_path("/img/category"),$imageName);
        }

        Category::create([
            "image"=> $imageName,
            "id" => $request->id,
            "name" => $request->name,
            "description" => $request->description,
        ]);

        return redirect()->route('categories.index')
            ->with("cate" ,"Created Successfully");
    } 

    public function edit($id){
        $categories = Category::find($id);
        return view("categories.edit",["categories"=>$categories]);
    }

    public function update(Request $request){
        $old_id = $request->old_id;
        $categories = Category::find($old_id);

        $request->validate([
            'image' => 'max:2048|mimes:png,jpeg,webp',
            'id' => [
                'required',
                'integer',
                Rule::unique('categories','id')->ignore($old_id,'id'),
            ],
            'name' => 'required',
            'description' => 'required',
        ]);

        if($request->hasFile('image')){
            if($categories->image && File::exists(public_path('/img/category/'. $categories->image))){
                File::delete(public_path('/img/category/'. $categories->image));
            }

            $image = $request->image;
            $imageName = time() . "_" . rand(1,100000) .".". $image->extension();
            $image->move(public_path("/img/category/"), $imageName);
        }else{
            $imageName = $categories->image;
        }

        $categories->update([
            'image'=> $imageName,
            'id' => $request->id,
            'name'=> $request->name,
            'description'=> $request->description,
        ]);

        return redirect()->route('categories.index')
            ->with('cate' ,'Updated Successfully');
    }
}
