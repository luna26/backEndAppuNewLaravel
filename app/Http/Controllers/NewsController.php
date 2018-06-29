<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    //
    public function getNews(){
        $news = DB::table('appu_news')->get();
        return $news;
    }

    public function getNewsDashboard(){
        $news = DB::table('appu_news')->get();
        return $news; 
    }

    public function uploadAndSaveNew(Request $request){
        $file = $request->file;
        $title = $request->title;
        $desc = $request->desc;

        $randomNumber = mt_rand(100000,999999);
        $name = $randomNumber.'.'.$file->getClientOriginalExtension();
        $destinationPath = public_path('images/news');
        $imagePath = '/images/news/'. "/".  $name;
        $file->move($destinationPath, $name);
        DB::table('appu_news')->insert([
            ['news_title' => $title, 'news_desc' => $desc, 'news_url_image' => $imagePath, 'news_active' => 1]
        ]);
        return $request->file->getClientOriginalExtension();
    } 
}
