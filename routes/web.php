<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//LOCALHOST
// Route::get('/APP{path?}', function($path = null){
//      return View::make('home');
// })->where('path', '.*'); 

//  Route::get('/', function(){
//      return view('welcome');
//  });


Route::post('/getNewsDashboard', 'NewsController@getNewsDashboard');

Route::post('/uploadNew', 'NewsController@uploadAndSaveNew');

Route::post('/getNews', 'NewsController@getNews');

Route::post('/deleteNew', 'NewsController@deleteNew');

Auth::routes();
Route::get('/', 'HomeController@index')->name('welcome');
