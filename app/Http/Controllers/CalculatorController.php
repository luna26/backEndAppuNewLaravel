<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CalculatorController extends Controller
{

    public function calcCost(Request $request)
    {
        $name = $request->name;
        $tel = $request->tel;
        $email = $request->email;
        $courses = $request->courses;
        $total_credits = 0;

        //SE CALCULA EL VALOR DEL CREDITO
        $credit_value_query =
        DB::table('appu_info')
            ->select('info_credit_value')
            ->where('info_code', 0)->get();

        $credit_value = $credit_value_query[0]->info_credit_value;

        //SE CALCULA LA CANTIDAD DE CREDITOS QUE EL USUARIO ELIGIO
        foreach ($courses as &$valor) {
            $total_credits_query = DB::table('appu_courses')
                ->select('course_credits')
                ->where('course_code', $valor)->get();

            $total_credits = $total_credits_query[0]->course_credits + $total_credits;
        }

        //SE OBTIENE EL DESCUENTO DE PRIMER INGRESO EN CREDITO
        $credit_payoff_first_enroll_query =
        DB::table('appu_info')
            ->select('info_payoff_first_enroll_credit')
            ->where('info_code', 0)->get();

        $credit_payoff_first_enroll = $credit_payoff_first_enroll_query[0]->info_payoff_first_enroll_credit / 100;

        //SE OBTIENE EL DESCUENTO DE PRIMER INGRESO AL CONTADO
        $credit_payoff_first_enroll_cash_query =
        DB::table('appu_info')
            ->select('info_payoff_first_enroll_cash')
            ->where('info_code', 0)->get();

        $credit_payoff_first_enroll_cash = $credit_payoff_first_enroll_cash_query[0]->info_payoff_first_enroll_cash / 100;

        //DESCUENTO EN LA MATRICULA
        $enroll_discount_query = DB::table('appu_info')
            ->select('info_enroll_discount')
            ->where('info_code', 0)->get();

        $enroll_discount = $enroll_discount_query[0]->info_enroll_discount / 100;

        //OBTIENE EL PRECIO DE LA MATRICULA
        $enroll_cost_query = DB::table('appu_info')
            ->select('info_enroll')
            ->where('info_code', 0)->get();

        $enroll_cost = $enroll_cost_query[0]->info_enroll;

        //OBTIENE EL VALOR DEL CARNE info_id_estudent_cost
        $id_student_cost_query = DB::table('appu_info')
            ->select('info_id_estudent_cost')
            ->where('info_code', 0)->get();

        $id_student_cost = $id_student_cost_query[0]->info_id_estudent_cost;

        //SE CALCULA EL PAGO A CREDITO
        $plans = array();
        $plans['contado'] = $this->calcTotalCash($credit_value, $total_credits, $credit_payoff_first_enroll_cash, $enroll_discount, $enroll_cost, $id_student_cost);
        $plans['credito'] = $this->calcCredit($credit_value, $total_credits, $credit_payoff_first_enroll, $enroll_discount, $enroll_cost, $id_student_cost);

        $plans['creditotest'] = $this->sendEmail($email);
        return $plans;
    }

    public function calcTotalCash($credit_value, $total_credits, $credit_payoff_first_enroll, $enroll_discount, $enroll_cost, $id_student_cost)
    {
        $total = ($credit_value * $total_credits);
        if ($total_credits > 6) {
            $payOff = $total * $credit_payoff_first_enroll;
        } else {
            $payOff = $total * 0.20;
        }

        $totalPayOff = $total - $payOff;

        $id_student = $id_student_cost;

        //SE CALCULA EL DESCUENTO DE LA MATRIUCLA
        $discount_enroll = ($enroll_cost * $enroll_discount);
        $discount_enroll_total = $enroll_cost - $discount_enroll;

        //SE GENERA EL JSON CON LOS DATOS
        $costs = array();

        $costs['costo_de_creditos'] = $total;
        $costs['costo_de_creditos_descuento'] = $payOff;
        $costs['costo_de_creditos_a_pagar'] = $totalPayOff;
        $costs['valor_por_credito'] = $credit_value;
        $costs['creditos_seleccionados'] = $total_credits;
        $costs['carne_total'] = $id_student_cost;

        $costs['costo_matricula'] = $enroll_cost;
        $costs['matricula_descuento'] = $discount_enroll;
        $costs['matricula_a_pagar'] = $discount_enroll_total;

        //Totales
        $costs['total_a_pagar'] = $discount_enroll_total + $totalPayOff + $id_student;
        $costs['total_a_pagar_mes'] = ($discount_enroll_total + $totalPayOff + $id_student) / 4;

        return $costs;
    }

    public function calcCredit($credit_value, $total_credits, $credit_payoff_first_enroll, $enroll_discount, $enroll_cost, $id_student_cost)
    {
        $total = ($credit_value * $total_credits);
        if ($total_credits > 6) {
            $payOff = $total * $credit_payoff_first_enroll;
        } else {
            $payOff = 0;
        }

        $totalPayOff = $total - $payOff;

        $id_student = $id_student_cost;

        //SE CALCULA EL DESCUENTO DE LA MATRIUCLA
        $discount_enroll = ($enroll_cost * $enroll_discount);
        $discount_enroll_total = $enroll_cost - $discount_enroll;

        //SE GENERA EL JSON CON LOS DATOS
        $costs = array();

        $costs['costo_de_creditos'] = $total;
        $costs['costo_de_creditos_descuento'] = $payOff;
        $costs['costo_de_creditos_a_pagar'] = $totalPayOff;
        $costs['valor_por_credito'] = $credit_value;
        $costs['creditos_seleccionados'] = $total_credits;
        $costs['carne_total'] = $id_student_cost;

        $costs['costo_matricula'] = $enroll_cost;
        $costs['matricula_descuento'] = $discount_enroll;
        $costs['matricula_a_pagar'] = $discount_enroll_total;

        //Totales
        $costs['total_a_pagar'] = $discount_enroll_total + $totalPayOff + $id_student;
        $costs['total_a_pagar_mes'] = ($discount_enroll_total + $totalPayOff + $id_student) / 4;

        $costs['tipo_credito'] = 'credito';

        return $costs;
    }

    public function sendEmail($email)
    {

        // $variables = array();

        // $variables['name'] = "Robert";
        // $variables['age'] = "30";

        // $template = file_get_contents("./template_email_costs.php");

        // // the message
        // $msg = "First line of text\nSecond line of text";

        // // use wordwrap() if lines are longer than 70 characters
        // $msg = wordwrap($msg, 70);

        // // send email
        // mail($email, "UCEM - costos", $msg);

        $to=$email; //change to ur mail address
        $subject="UandBlog - Send Email Template Demo";
    
        $headers = 'MIME-Version: 1.0'."\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
        $headers .= "From: noreply@uandblog.com"; 
    
        mail($to, $subject, $this->returnHtmlEmail(), $headers); 
    }

    public function returnHtmlEmail(){
        $htmlContent = "
        <!DOCTYPE html>
        <html>
        
        <body style='background-color:#3dc4ff'>
            <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                <tr>
                    <td align='center'>
                        <table style='width:600px; background-color:#fff; border:'0';'>
                            <tr style='border: 3px solid #9cbdcc;'>
                                <td style='width:200px;  border:'0';'>
        
                                </td>
                                <td style='width:200px; border:'0'; text-align: center;'>
                                    Pago de contado
                                </td>
                                <td style='width:200px;  border:'0';'>
        
                                </td>
                            </tr>
                            <tr>
                                <table style='width:600px; background-color:white; border:'0';'>
                                    <tr>
                                        <td>Colegiatura</td>
                                        <td>{{colegiatura}}</td>
                                    </tr>
                                    <tr>
                                            <td>Descuento</td>
                                        <td>{{descuento}}</td>
                                    </tr>
                                    <tr>
                                        <td>Matricula</td>
                                        <td>{{matricuka}}</td>
                                    </tr>
                                    <tr>
                                        <td>Descuento 1er ingreso</td>
                                        <td>{{descuento_1er_ingreso}}</td>
                                    </tr>
                                    <tr>
                                        <td>Carne anual</td>
                                        <td>{{carne_anual}}</td>
                                    </tr>
                                    <tr>
                                        <td>Total a pagar</td>
                                        <td>{{total_a_pagar}}</td>
                                    </tr>
                                </table>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>";

        return $htmlContent;
    }

    public function getSchedules(){

        $info_schedules = DB::table('appu_schedule')
        ->join('appu_days', 'appu_schedule.day_id', '=', 'appu_days.day_id')
        ->select('appu_schedule.*', 'appu_days.*')
        ->get();

        return $info_schedules;
    }

    public function getCoursesDashboard(){

        $info_courses = DB::table('appu_courses')
        ->get();

        return $info_courses;
    }

    public function getCoursesCareers(){
        $courses_careers = DB::table('appu_careers_courses')
        ->join('appu_courses', 'appu_careers_courses.course_code', '=', 'appu_courses.course_code')
        ->join('appu_careers', 'appu_careers_courses.careers_id', '=', 'appu_careers.careers_id')
        ->select('appu_careers_courses.*', 'appu_courses.*', 'appu_careers.*')
        ->orderBy('appu_careers.careers_id', 'asc')
        ->get();

        return $courses_careers;
    }

    public function returnCourseSchedule(){

        $courses_careers = DB::table('appu_courses_schedule')
        ->join('appu_courses', 'appu_courses_schedule.course_code', '=', 'appu_courses.course_code')
        ->join('appu_schedule', 'appu_courses_schedule.schedule_id', '=', 'appu_schedule.schedule_id')
        ->join('appu_days', 'appu_schedule.day_id', '=', 'appu_days.day_id')
        ->select('appu_courses_schedule.*', 'appu_courses.*', 'appu_schedule.*', 'appu_days.*')
        ->orderBy('appu_courses.course_code', 'asc')
        ->get();

        return $courses_careers;
    }

    public function addCareersCourse(Request $request){
        $career_id = $request->career_id;
        $course_code = $request->course_code;

        DB::table('appu_careers_courses')->insert([
            ['careers_id' => $career_id, 'course_code' => $course_code]
        ]);

        return 'OK';
    }

    public function addScheduleCourse(){
        return 'OK';
    }

    public function loadCareerCourseInfo(){

        $carrers = DB::table('appu_careers')
        ->get();

        return $carrers;
    }

    public function deleteCourseCaereer(Request $request){
        $career_id = $request->career_id;
        $course_code = $request->course_code;

        DB::table('appu_careers_courses')->where([
            ['careers_id', '=', $career_id],
            ['course_code', '=', $course_code]
        ])->delete();

        return 'OK';
    }
}
