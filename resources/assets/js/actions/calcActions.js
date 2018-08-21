import axios from 'axios';
import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_COURSES_CAREERS,
    ON_LOAD_SCHEDULE_COURSE
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