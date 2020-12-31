<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('posts', [PostController::class, 'index']);

Route::group(['prefix' => 'post'], function () {
    Route::post('add', [PostController::class, 'add']);
    Route::get('edit/{id}', [PostController::class, 'edit']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::delete('delete/{id}', [PostController::class, 'delete']);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
