<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CareerController extends Controller
{
    public function getCareers(){
        $careers = DB::table('appu_careers')->orderBy('careers_id', 'desc')->get();
        return $careers;
    }

    public function createCareer(Request $request){
        $file = $request->file;
        $title = $request->title;
        $desc = $request->desc;
        $image = $request->image;

        $randomNumber = mt_rand(100000,999999);
        $name = $randomNumber.'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('images/careers');
        $imagePath = '/images/careers'. "/".  $name;
        $image->move($destinationPath, $name);

        $destinationPathFile = public_path('/plans');
        $nameFile = $randomNumber.'.'.$file->getClientOriginalExtension();
        $filePath = '/plans'. "/".  $nameFile;
        $file->move($destinationPathFile, $nameFile);


        DB::table('appu_careers')->insert([
            ['careers_title' => $title, 'careers_desc' => $desc, 'careers_url_img' => $imagePath, 'careers_url_path' => $filePath]
        ]);
        return 'OK';
    }

    public function deleteCareer(Request $request){
        $id =  $request->id;
        DB::table('appu_careers')->where('careers_id', '=', $id)->delete();
        return $id;
    }

    public function getCareer(Request $request){
        $id =  $request->id;
        $career = DB::table('appu_careers')->where('careers_id', '=', $id)->get();
        return $career;
    }
}