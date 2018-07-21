<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InfoController extends Controller
{
    public function getInfo(){
        $info = DB::table('appu_info')->get();
        return $info;
    }
}