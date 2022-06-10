<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\favourite;

class FavouriteController extends Controller
{
    public function addItemFav (Request $request){
        $favourite = new favourite;
        $favourite->title = $request->title;
        $favourite->detail = $request->detail;
        $favourite->price = $request->price;
        
        //$favourite->user_id = $request->user_id;
        $favourite->save();
            
        return response()->json([
            "status" => "Success"
            ], 200);
     }
}
