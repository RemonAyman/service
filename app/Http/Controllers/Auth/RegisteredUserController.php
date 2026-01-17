<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['required', 'string', 'max:20', 'unique:users,phone'], // Phone is required and MUST be unique
            'address' => ['nullable', 'string'],
            'role' => ['required', 'string', 'in:user,technician'],
            
            // Technician specific fields
            'category_id' => ['required_if:role,technician', 'exists:categories,id'],
            'experience_years' => ['required_if:role,technician', 'integer', 'min:0'],
            'hourly_rate' => ['required_if:role,technician', 'numeric', 'min:0'],
            'city' => ['required_if:role,technician', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'availability' => ['required_if:role,technician', 'array'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
        ]);

        if ($request->role === 'technician') {
            \App\Models\Technician::create([
                'user_id' => $user->id,
                'category_id' => $request->category_id,
                'experience_years' => $request->experience_years,
                'hourly_rate' => $request->hourly_rate,
                'city' => $request->city,
                'bio' => $request->bio,
                'availability' => json_encode($request->availability),
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
