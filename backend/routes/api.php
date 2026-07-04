<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/penyakit', App\Http\Controllers\Api\PenyakitController::class);
Route::apiResource('/gejala', App\Http\Controllers\Api\GejalaController::class);

// Basis Pengetahuan routes
Route::get('/basis-pengetahuan/all-penyakit', [App\Http\Controllers\Api\BasisPengetahuanController::class, 'allPenyakit']);
Route::get('/basis-pengetahuan/all-gejala', [App\Http\Controllers\Api\BasisPengetahuanController::class, 'allGejala']);
Route::apiResource('/basis-pengetahuan', App\Http\Controllers\Api\BasisPengetahuanController::class);

// Dashboard route
Route::get('/dashboard', [App\Http\Controllers\Api\DashboardController::class, 'index']);

// Diagnosa (Teorema Bayes) routes
Route::post('/diagnosa', [App\Http\Controllers\Api\DiagnosaController::class, 'hitung']);

Route::get('/diagnosa/riwayat', [App\Http\Controllers\Api\DiagnosaController::class, 'riwayat']);
Route::delete('/diagnosa/riwayat/{id}', [App\Http\Controllers\Api\DiagnosaController::class, 'destroyRiwayat']);

