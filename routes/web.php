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

//  Route::get('/APP{path?}', function($path = null){
//      return View::make('home');
//  })->where('path', '.*'); 


Route::post('/getNewsDashboard', 'NewsController@getNewsDashboard');

Route::post('/uploadNew', 'NewsController@uploadAndSaveNew');

Route::post('/getNews', 'NewsController@getNews');

// Route::group(['middleware' => 'web'], function () {
//     //
//     Route::post('/login', function (Request $request) {
//         return 'lasdogin';
//     });
// });


Auth::routes();
Route::get('/', 'HomeController@index')->name('home');
