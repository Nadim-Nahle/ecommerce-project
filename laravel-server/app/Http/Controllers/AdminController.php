<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\Item;

class AdminController extends Controller
{
    public function addItem(Request $request){
        $item = new item;
        $item->name = $request->name;
        $item->detail = $request->detail;
        $item->category = $request->category;
        
        //$item->user_id = $request->user_id;
        $item->save();
            
        return response()->json([
            "status" => "Success"
            ], 200);
     }
}
