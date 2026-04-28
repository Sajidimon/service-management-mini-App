<?php

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('services', ServiceController::class);
    Route::patch('services/{service}/toggle', [ServiceController::class, 'toggleStatus']);
    
    Route::patch('profile', [ProfileController::class, 'update']);
    Route::put('profile/password', [ProfileController::class, 'updatePassword']);
});
