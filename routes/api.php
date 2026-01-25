<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\ServiceRequestController;
use App\Http\Controllers\API\TechnicianController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->load('technician');
    });
    Route::post('/profile/update', [UserController::class, 'updateProfile']);
});
///// User Routes API/////
Route::get('/users', [UserController::class, 'index']);
Route::get('/userone/{id}', [UserController::class, 'show']);
Route::get('/userdelete/{id}', [UserController::class, 'delete']);
Route::post('/store', [UserController::class, 'store']);
Route::post('/update', [UserController::class, 'update']);
///// Category Routes API/////
Route::get('/cats', [CategoryController::class, 'index']);
Route::get('/catone/{id}', [CategoryController::class, 'show']);
Route::get('/catdelete/{id}', [CategoryController::class, 'delete']);
Route::post('/catstore', [CategoryController::class, 'store']);
Route::post('/catupdate', [CategoryController::class, 'update']);
/////technician Routes API/////
Route::get('/techs', [TechnicianController::class, 'index']);
Route::get('/techone/{id}', [TechnicianController::class, 'show']);
Route::get('/techdelete/{id}', [TechnicianController::class, 'delete']);
Route::post('/techstore', [TechnicianController::class, 'store']);
Route::post('/techupdate', [TechnicianController::class, 'update']);
///////Service Routes API/////
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/serviceone/{id}', [ServiceController::class, 'show']);
Route::get('/servicedelete/{id}', [ServiceController::class, 'delete']);
Route::post('/servicestore', [ServiceController::class, 'store']);
Route::post('/serviceupdate', [ServiceController::class, 'update']);
////////Service Requests Routes API/////

Route::get('/servicerequests', [ServiceRequestController::class, 'index']);
Route::get('/servicerequestone/{id}', [ServiceRequestController::class, 'show']);
Route::get('/servicerequestdelete/{id}', [ServiceRequestController::class, 'delete']);
Route::post('/servicerequeststore', [ServiceRequestController::class, 'store']);
Route::post('/servicerequestupdate', [ServiceRequestController::class, 'update']);
////////Reviews Routes API/////
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviewone/{id}', [ReviewController::class, 'show']);
Route::get('/reviewdelete/{id}', [ReviewController::class, 'delete']);
Route::post('/reviewstore', [ReviewController::class, 'store']);
Route::post('/reviewupdate', [ReviewController::class, 'update']);

///// Admin Routes API /////
Route::get('/admin/stats', [\App\Http\Controllers\API\AdminController::class, 'stats']);