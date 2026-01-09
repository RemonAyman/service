<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Review;
use App\Models\Service;
use App\Models\ServiceRequest;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {

    $users = User::all();
    $categories = Category::all();
    $services = Service::all();
    $technicians = Technician::all();
    $serviceRequests = ServiceRequest::all();
    $reviews = Review::all();

    return view('home', compact('users', 'categories', 'services', 'technicians', 'serviceRequests', 'reviews'));
}
    }

