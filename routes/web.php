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
Route::get('/APP{path?}', function($path = null){
     return View::make('home');
})->where('path', '.*'); 

  Route::get('/', function(){
      return view('welcome');
  });


Route::post('/getNewsDashboard', 'NewsController@getNewsDashboard');
Route::post('/uploadNew', 'NewsController@uploadAndSaveNew');
Route::post('/getNews', 'NewsController@getNews');
Route::post('/deleteNew', 'NewsController@deleteNew');
Route::post('/getNewUpdate', 'NewsController@getNewUpdate');
Route::post('/updateNew', 'NewsController@updateNew');
Route::post('/getCareers', 'CareerController@getCareers');
Route::post('/postCareer', 'CareerController@createCareer');
Route::post('/deleteCareer', 'CareerController@deleteCareer'); 
Route::post('/getCareer', 'CareerController@getCareer');
Route::post('/getInfo', 'InfoController@getInfo');
Route::post('/getCoursesCarrer', 'CareerController@getCoursesCarrer');
Route::post('/calcCost', 'CalculatorController@calcCost');
Route::post('/getSchedules', 'CalculatorController@getSchedules');
Route::post('/getCoursesDashboard', 'CalculatorController@getCoursesDashboard');
Route::post('/getCoursesCareers', 'CalculatorController@getCoursesCareers');
Route::post('/returnCourseSchedule', 'CalculatorController@returnCourseSchedule');
Route::post('/returnCareersDashboard', 'CalculatorController@returnCareersDashboard');
Route::post('/addCareersCourse', 'CalculatorController@addCareersCourse');
Route::post('/addScheduleCourse', 'CalculatorController@addScheduleCourse');
Route::post('/loadCareerCourseInfo', 'CalculatorController@loadCareerCourseInfo');
Route::post('/deleteCourseCaereer', 'CalculatorController@deleteCourseCaereer');



//  Auth::routes();
//  Route::get('/', 'HomeController@index')->name('welcome');
