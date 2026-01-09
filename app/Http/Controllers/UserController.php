<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return view('users.index', compact('users'));
    }
        public function show($id)
    {
        $users = User::find($id);

        if (!$users) {
            return redirect()->route('users.index')->with("error", "User not found.");
        }

        return view("users.show", ["users" => $users]);
    }

    public function create()
    {
        return view("users.create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|unique:users',
            'name'  => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        User::create([
            "id"       => $request->id,
            "name"     => $request->name,
            "email"    => $request->email,
            "password" => $request->password, 
            "role"     => $request->role,
            "phone"    => $request->phone,
            "address"  => $request->address,
            
        ]);

        return redirect()->route('users.index')->with("text", "Created Successfully");
    }

    public function delete($id)
{
    $users = User::find($id);

    if (!$users) {
        return redirect()->route('users.index')->with("error", "User not found.");
    }

    // التحقق من وجود عملاء مرتبطين
   

    $users->delete();

    return redirect()->route('users.index')->with("text", "Deleted Successfully");
}

   public function edit($id){
    $users = User::find($id);
    if(!$users){
        return redirect()->route('users.index')->with('error', 'User not found.');
    }
    return view("users.edit", compact('users'));
}

 public function update(Request $request)
{
    $old_id = $request->old_id;

    $users = User::find($old_id);
    if (!$users) {
        return redirect()->route('users.index')->with('error', 'User not found');
    }

    // Validation
    $request->validate([
        'id' => [
            'required',
            Rule::unique('users', 'id')->ignore($old_id),
        ],
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($old_id),
        ],
        'password' => 'required|min:6',
        'phone' => 'nullable',
        'address' => 'nullable',
        'role' => 'required|in:user,admin',
    ]);

    // Update
    $users->update([
        'id'       => $request->id,
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => $request->password,
        'role'     => $request->role,
        'phone'    => $request->phone,
        'address'  => $request->address,
    ]);

        return redirect()->route('users.index')->with('text' ,'Updated Successfully');
    }

}
