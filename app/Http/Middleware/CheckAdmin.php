<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user() && Auth::user()->role === 'admin') {
             
            return $next($request);
        }else if(Auth::user() && Auth::user()->role === 'user')
           return redirect()->route('welcome')->with("error", "You do not have admin access.");
        else{
            return redirect()->route('login')->with("error", "Please log in to access this page.");
        }
    } 
}
