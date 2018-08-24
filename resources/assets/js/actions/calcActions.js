import axios from 'axios';
import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_COURSES_CAREERS,
    ON_LOAD_SCHEDULE_COURSE,
    ON_ADD_CAREER_COURSE,
    ON_ADD_CAREER_COURSE_ERROR,
    ON_LOAD_CAREERS_CALC,
    RELOAD_COURSES_CAREER,
    ON_DELETE_CAREER_COURSE,
    ON_LOAD_DAYS,
    ON_LOAD_INFO_CALCULATOR,
    SHOW_LOADER_CALC
} from './types';
import { URL_SERVER } from '../config';

export const getSchedules = (text) => {
    return dispatch => {
        axios.post(URL_SERVER + "/getSchedules", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_SCHEDULES_CALC,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const getCoursesCalcDashboard = () => {
    return dispatch => {
        axios.post(URL_SERVER + "/getCoursesDashboard", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_COURSES_CAL,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const getCoursesCareers = () => {
    return dispatch => {
        axios.post(URL_SERVER + "/getCoursesCareers", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_COURSES_CAREERS,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const returnCourseSchedule = () => {
    return dispatch => {
        axios.post(URL_SERVER + "/returnCourseSchedule", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_SCHEDULE_COURSE,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const addCareersCourse = (career_id, course_code) => {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        let data = {
            career_id: career_id,
            course_code: course_code
        }
        axios.post(URL_SERVER + "/addCareersCourse", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_ADD_CAREER_COURSE,
                    payload: response
                });
                console.log(response, 'respnose');
            })
            .catch(function (error) {
                dispatch({
                    type: ON_ADD_CAREER_COURSE_ERROR
                });
                console.log(error, 'funciona');
            });
    }
}

export const loadCareersCalc = () => {
    return dispatch => {
        axios.post(URL_SERVER + "/loadCareerCourseInfo", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_CAREERS_CALC,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const reloadCoursesCareer = (param) => {
    return dispatch => {
        dispatch({
            type: RELOAD_COURSES_CAREER,
            payload: param
        });
    }
}

export const deleteCourseCaereer = (career_id, course_code) => {

    let data = {
        career_id: career_id,
        course_code: course_code
    }
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/deleteCourseCaereer", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_DELETE_CAREER_COURSE,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const addScheduleCourse = (schedule_id, course_code) => {
    let data = {
        schedule_id: schedule_id,
        course_code: course_code
    }
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/addCourseSchedule", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const deleteScheduleCourse = (schedule_id, course_code) => {
    let data = {
        schedule_id: schedule_id,
        course_code: course_code
    }
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/deleteCourseSchedule", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export const newCourse = (course_code, course_name, course_credits) => {
    let data = {
        course_code: course_code,
        course_name: course_name,
        course_credits: course_credits
    }
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/addCourseCalc", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const deleteCourseCalc = (course_code) => {
    let data = {
        course_code: course_code
    }
    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });

        axios.post(URL_SERVER + "/deleteCourseCalc", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export const getDays = () => {
    return dispatch => {
        axios.post(URL_SERVER + "/getDays", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_DAYS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const addSchedule = (day_id, info_schedule) => {

    let data = {
        day_id: day_id,
        info_schedule: info_schedule
    }

    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/addSchedule", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const deleteSchedule = (schedule_id) => {

    let data = {
        schedule_id: schedule_id
    }

    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/deleteSchedule", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: RELOAD_COURSES_CAREER,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const getInfoCalculator = () => {

    return dispatch => {
        axios.post(URL_SERVER + "/getInfoCalculator", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_INFO_CALCULATOR,
                    payload: response.data[0]
                });
                console.log(response, 'response');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const updateInfoCalculator = (value_credit, enroll_value, info_credits_payoff, info_id_estudent_cost, info_payoff_first_enroll_credit, info_payoff_first_enroll_cash, info_enroll_discount) => {

    let data = {
        info_credit_value: value_credit,
        info_enroll: enroll_value,
        info_credits_payoff: info_credits_payoff,
        info_id_estudent_cost: info_id_estudent_cost,
        info_payoff_first_enroll_credit: info_payoff_first_enroll_credit,
        info_payoff_first_enroll_cash: info_payoff_first_enroll_cash,
        info_enroll_discount: info_enroll_discount
    }

    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });
        axios.post(URL_SERVER + "/updateInfoCalculator", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                 dispatch({
                     type: RELOAD_COURSES_CAREER,
                     payload: true
                 });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}



