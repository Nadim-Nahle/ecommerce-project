<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class AuthController extends Controller
{   
    public function _construct(){
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function register(Request $request){
        $validator = Validator::make($request -> all(), [
            'name' => 'required',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator -> fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password'=>bcrypt($request->password)]
        ));
        return response()->json([
            'message' => 'User success',
            'user' => $user
        ],201);
    }
}
