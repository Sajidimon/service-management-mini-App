<?php

use App\Http\Controllers\Api\ServiceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('services', ServiceController::class);
});
