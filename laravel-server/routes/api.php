<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AdminController;

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
//VERSION ---1---
Route::group(['prefix' => 'v1'], function (){

    //ITEMS GROUP
    Route::group(['prefix' => 'items'], function (){
    
        Route::get('/allitems', [ItemController::class, 'getAllItems']);
        Route::get('/item/{id?}', [ItemController::class, 'getItem']);
       
        
    });
    
    //USERS GROUP
    Route::group(['prefix' => 'user'], function (){

        Route::group(['middleware'=>'api', 'prefix' => 'auth'],function($router){

            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/login', [AuthController::class, 'login']);
            Route::get('/profile', [AuthController::class, 'profile']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    
    });

    //ADMIN GROUP
    Route::group(['prefix' => 'admin'], function (){

        Route::group(['middleware' => 'role.item'], function(){

            Route::post('/additem', [AdminController::class, 'addItem']);
        });       
    });

    //FAVOURITES GROUP 
    Route::group(['prefix' => 'fav'], function (){ 

        Route::post('/addtofav', [AdminController::class, 'addItemFav']);
    });

});
