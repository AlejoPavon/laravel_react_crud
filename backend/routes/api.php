<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeveloperController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Developer CRUD
    Route::apiResource('developers', DeveloperController::class);
    
    // Additional utility route
    Route::patch('/developers/{developer}/toggle-active', [DeveloperController::class, 'toggleActive']);
});