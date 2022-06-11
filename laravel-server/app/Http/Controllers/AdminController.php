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
        $item->category_id = $request->category_id;
        $item->price = $request->price;
        
        $item->save();
            
        return response()->json([
            "status" => "Success"
            ], 200);
     }
}
