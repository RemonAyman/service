<?php

namespace App\Http\Controllers;

use App\Models\Technician;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TechnicianController extends Controller
{
    public function index()
    {
        $technicians = Technician::with(['category','serviceRequests','reviews'])->get();
        return view('technicians.index', compact('technicians'));
    }

    public function show($id)
    {
        $technicians = Technician::with(['category','serviceRequests','reviews'])->find($id);
        return view('technicians.show', ['technicians' => $technicians]);
    }

    public function create()
    {
        $categories = Category::all();
        $users = User::all();

        return view('technicians.create', compact('categories','users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|unique:technicians,id',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'experience_years' => 'required|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'is_available' => 'required|boolean',
        ]);

        Technician::create([
            'id' => $request->id,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'experience_years' => $request->experience_years,
            'rating' => $request->rating ?? 0,
            'is_available' => $request->is_available,
        ]);

        return redirect()->route('technicians.index')
            ->with('message', 'Technician Created Successfully');
    }

    public function edit($id)
    {
        $technicians = Technician::find($id);
        $categories = Category::all();
        $users = User::all();

        return view('technicians.edit', compact('technicians','categories','users'));
    }

    public function update(Request $request)
    {
        $old_id = $request->old_id;
        $technicians = Technician::find($old_id);

        $request->validate([
            'id' => [
                'required',
                'integer',
                Rule::unique('technicians','id')->ignore($old_id,'id'),
            ],
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'experience_years' => 'required|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'is_available' => 'required|boolean',
        ]);

        $technicians->update([
            'id' => $request->id,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'experience_years' => $request->experience_years,
            'rating' => $request->rating ?? 0,
            'is_available' => $request->is_available,
        ]);

        return redirect()->route('technicians.index')
            ->with('message', 'Technician Updated Successfully');
    }

   public function delete($id)
{
    $technician = Technician::findOrFail($id); // هيجيب خطأ لو مش موجود
    $technician->delete();

    return redirect()->route('technicians.index')
                     ->with('message', 'Technician Deleted Successfully');
}

}
