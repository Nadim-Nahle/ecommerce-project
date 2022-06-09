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

    //REGISTER CONTROLLER
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

    //LOGIN CONTROLLER
    public function login(Request $request){

        $validator = Validator::make($request -> all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if($validator -> fails()){
            return response()->json($validator->errors(),422);
        }
        if(!$token=auth()->attempt($validator->validated())){
            return response()->json(['error'=>'Unauthorized'],401);
        }
        return $this->createNewToken($token);
    }

    //CREATE NEW JWT TOKEN
    public function CreateNewToken($token){
        return response()->json([
            'access_token'=>$token,
            'token_type'=>'bearer',
            'expires_in'=>auth()->factory()->getTTl()*60,
            'user'=>auth()->user()
        ]);
    }

    //PROFILE CONTROLLER
    public function profile(){
        return response() -> json(auth()->user());
    }

}
