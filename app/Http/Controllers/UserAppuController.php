<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAppuController extends Controller
{
    //
    public function insertUser(){
        $users = DB::table('appu_users')->get();
        echo 'database info ' . $users;
    }
}
