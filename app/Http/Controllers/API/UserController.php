<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
   public function index(){
    $users = UserResource::collection(User::all());
    $data = [
        "msg" => "Returning all users",
        "status" => 200,
        "users" => $users

    ];
    return response()->json($data);
   }  

   public function show($id){
    $users = User::find($id);
    if($users){
        $data = [
            "msg" => "Returning user with id: $id",
            "status" => 200,
            "users" => new UserResource($users)
    
        ];
        return response()->json($data);
    }else{
        $data = [
            "msg" => "User with id: $id not found",
            "status" => 404,
            "users" => null
    
        ];
        return response()->json($data, 404);
    }
}
    public function delete($id)
{
    $users = User::find($id);

   
    // التحقق من وجود عملاء مرتبطين
   
if ($users) {
        $users->delete();
   
        $data = [
            "msg" => "User with id: $id deleted successfully",
            "status" => 200,
            "users" => null
    
        ];
        return response()->json($data);
    } else {
        $data = [
            "msg" => "User with id: $id not found",
            "status" => 404,
            "users" => null
    
        ];
        return response()->json($data, 404);
    }


   
}
public function store(Request $request)
    {
       $validator = FacadesValidator::make($request->all(), [
            'id' => 'required|unique:users',
            'name'  => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'phone' => 'nullable|string|unique:users,phone',
            'address' => 'nullable|string',
            
        ]);
        

        if ($validator->fails()) {
            return response()->json([
                'msg' => 'Validation Error',
               
                'errors' => $validator->errors()
            ], 200);
        }
       

       $newUser = User::create([
            "id"       => $request->id,
            "name"     => $request->name,
            "email"    => $request->email,
            "password" => Hash::make($request->password), 
            "role"     => $request->role,
            "phone"    => $request->phone,
            "address"  => $request->address,
            
        ]);

        $data = [
            "msg" => "User created successfully",
            "status" => 200,
            "users" =>new UserResource($newUser)
    
        ];
        return response()->json($data);
    }    public function update(Request $request)
    {
        $user = User::find($request->old_id);

        if (!$user) {
            return response()->json([
                'msg' => 'User not found',
                'status' => 404
            ], 404);
        }

        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => 'required|in:user,admin',
            'phone' => 'nullable',
            'address' => 'nullable',
            'password' => 'nullable|min:6',
        ]);

        $data = [
            'name'    => $request->name,
            'email'   => $request->email,
            'role'    => $request->role,
            'phone'   => $request->phone,
            'address' => $request->address,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'msg' => 'User updated successfully',
            'status' => 200,
            'user' => $user
        ]);
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'password' => 'nullable|min:6|confirmed',
            'role' => 'nullable|string|in:user,technician',
            // Technician info
            'city' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric',
            'bio' => 'nullable|string',
            'experience_years' => 'nullable|integer',
            'availability' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id', // Added category_id
        ]);

        $data = [
            'name'    => $request->name,
            'email'   => $request->email,
            'phone'   => $request->phone,
            'address' => $request->address,
        ];

        if ($request->filled('role')) {
            $data['role'] = $request->role;
        }

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        // Update Technician Info
        if ($request->role === 'technician' || $user->role === 'technician') {
            $user->technician()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'city' => $request->city,
                    'hourly_rate' => $request->hourly_rate,
                    'bio' => $request->bio,
                    'experience_years' => $request->experience_years,
                    'availability' => $request->availability,
                    'category_id' => $request->category_id ?? ($user->technician?->category_id ?? 1),
                ]
            );
        }

        return response()->json([
            'msg' => 'تم تحديث البيانات بنجاح',
            'status' => 200,
            'user' => $user
        ]);
    }
}