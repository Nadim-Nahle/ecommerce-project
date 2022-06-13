<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;

class ItemController extends Controller
{
    //GET ALL ITEMS CONTROLLER
    public function getAllItems($id = null){
        $items = item::all();
            foreach ($items as $items) {
                $category = Category::find($items->id);
                
            }

        
        return response()->json([
            "status" => "success",
            "Items" => $items
        ],200);
     }

     //GET ONE ITEM CONTROLLER
     public function getItem($id = null){
        if($id){
            $item = Item::find($id);
        }
        else{
            $item = Item::all();
        }
        
        return response()->json([ 
            "status" => "success",
            "items" => $item
        ],200);
     }
}

