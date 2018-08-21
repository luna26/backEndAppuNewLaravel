import axios from 'axios';
import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_COURSES_CAREERS,
    ON_LOAD_SCHEDULE_COURSE,
    ON_ADD_CAREER_SCHEDULE,
    ON_ADD_CAREER_COURSE,
    ON_ADD_CAREER_COURSE_ERROR,
    ON_LOAD_CAREERS_CALC,
    RELOAD_COURSES_CAREER,
    ON_DELETE_CAREER_COURSE
} from './types';
import {URL_SERVER} from '../config';

export const getSchedules = (text) => {
    return dispatch => {
        axios.post(URL_SERVER+"/getSchedules", '', {
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
        axios.post(URL_SERVER+"/getCoursesDashboard", '', {
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
        axios.post(URL_SERVER+"/getCoursesCareers", '', {
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
        axios.post(URL_SERVER+"/returnCourseSchedule", '', {
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
        let data = {
            career_id : career_id,
            course_code : course_code
        }
        axios.post(URL_SERVER+"/addCareersCourse", data, {
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
        axios.post(URL_SERVER+"/loadCareerCourseInfo", '', {
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
        course_code:course_code
    }
    return dispatch => {
        axios.post(URL_SERVER+"/deleteCourseCaereer", data, {
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
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


