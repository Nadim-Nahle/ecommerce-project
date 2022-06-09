<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function getAllItems($id = null){
        $items = Item::all();
        return response()->json([
            "status" => "success",
            "Items" => $items
        ],200);
     }
}
