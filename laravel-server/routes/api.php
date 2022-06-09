<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function (){


    Route::group(['prefix' => 'items'], function (){
    
        Route::get('/allitems', [ItemController::class, 'getAllItems']);
        Route::get('/item/{id?}', [ItemController::class, 'getItem']);
        
    });
    
   
    
});
