<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';


Route::get('/', function () {
    return view('welcome');
})->name("welcome");


//   Route::get('/dashboard',[HomeController::class,"index"] )->middleware('CheckAdmin')->name('home'); 

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Auth::routes(['register' => false]);

Route::group(["middleware"=>"CheckAdmin"] ,function(){


    Route::get('/dashboard',[HomeController::class,"index"] )->name('home');    
    
///////////User/////////
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/users/show/{id}', [UserController::class, 'show'])->name('users.show');
Route::get('/users/delete/{id}', [UserController::class, 'delete'])->name('users.delete');
Route::get('/user/create', [UserController::class, 'create'])->name('users.create');
Route::post('/user/store', [UserController::class, 'store'])->name('users.store');
Route::get('/users/edit/{id}', [UserController::class, 'edit'])->name('users.edit');
Route::post('/users/update', [UserController::class, 'update'])->name('users.update');
///////////Category/////////
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
 Route::get('/categories/show/{id}', [CategoryController::class, 'show'])->name('categories.show');
 Route::get('/categories/delete/{id}', [CategoryController::class, 'delete'])->name('categories.delete');
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories/store', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/categories/edit/{id}',[CategoryController::class,'edit'])->name('categories.edit');
Route::post('/categories/update/{id}', [CategoryController::class, 'update'])->name('categories.update');
////////Technician////////
Route::get('technicians', [TechnicianController::class, 'index'])->name('technicians.index');
Route::get('technicians/create', [TechnicianController::class, 'create'])->name('technicians.create');
Route::post('technicians/store', [TechnicianController::class, 'store'])->name('technicians.store');
Route::get('technicians/edit/{id}', [TechnicianController::class, 'edit'])->name('technicians.edit');
Route::post('technicians/update', [TechnicianController::class, 'update'])->name('technicians.update');
Route::get('technicians/{id}', [TechnicianController::class, 'show'])->name('technicians.show');
 Route::get('/technicians/delete/{id}', [TechnicianController::class, 'delete'])->name('technicians.delete');

///////Service/////////
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
Route::get('/services/{id}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/services/{id}/edit', [ServiceController::class, 'edit'])->name('services.edit');
Route::put('/services/{id}', [ServiceController::class, 'update'])->name('services.update');
Route::delete('/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
////////Service Requests/////////
Route::get('/service_requests', [ServiceRequestController::class, 'index'])->name('service_requests.index');

// Show create form
Route::get('/service_requests/create', [ServiceRequestController::class, 'create'])->name('service_requests.create');

// Store new service request
Route::post('/service_requests', [ServiceRequestController::class, 'store'])->name('service_requests.store');

// Show single service request
Route::get('/service_requests/{id}', [ServiceRequestController::class, 'show'])->name('service_requests.show');

// Show edit form
Route::get('/service_requests/{id}/edit', [ServiceRequestController::class, 'edit'])->name('service_requests.edit');

// Update service request
Route::put('/service_requests/{id}', [ServiceRequestController::class, 'update'])->name('service_requests.update');

// Delete service request
Route::delete('/service_requests/{id}', [ServiceRequestController::class, 'destroy'])->name('service_requests.destroy');

//////Reviews/////////
Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');

// Show create form
Route::get('/reviews/create', [ReviewController::class, 'create'])->name('reviews.create');

// Store new review
Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

// Show single review
Route::get('/reviews/{id}', [ReviewController::class, 'show'])->name('reviews.show');

// Show edit form
Route::get('/reviews/{id}/edit', [ReviewController::class, 'edit'])->name('reviews.edit');

// Update review
Route::put('/reviews/{id}', [ReviewController::class, 'update'])->name('reviews.update');

// Delete review
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
////////////////////////////////////////
    // Custom Admin Dashboard Routes (matching React frontend calls)
    Route::post('/servicestore', [ServiceController::class, 'store']);
    Route::post('/serviceupdate', [ServiceController::class, 'update']);
    Route::get('/servicedelete/{id}', [ServiceController::class, 'destroy']); // Note: React uses GET for delete currently

    Route::post('/catstore', [CategoryController::class, 'store']);
    Route::post('/catupdate', [CategoryController::class, 'update']);
    Route::get('/catdelete/{id}', [CategoryController::class, 'delete']);

    Route::get('/userdelete/{id}', [UserController::class, 'delete']);

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
});

// Catch-all route for React SPA - must be at the end
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
