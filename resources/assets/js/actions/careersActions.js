import axios from 'axios';
import {
    ON_LOAD_CAREERS,
    ON_POST_CAREER_COMPLETED,
    ON_DELETE_CAREER
} from './types';
import {URL_SERVER} from '../config';

export const getCareers = (text) => {
    return dispatch => {
        axios.post(URL_SERVER+"/getCareers", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_CAREERS,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const postCareer = (title, desc, file, image) => {
    let formData = new FormData();

    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', file);
    formData.append('image', image);

    return dispatch => {
        axios.post(URL_SERVER+"/postCareer", formData, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_POST_CAREER_COMPLETED,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const deleteCareer = (id) => {
    return dispatch => {
        axios.post(URL_SERVER+"/deleteCareer", { id: id })
            .then(function (response) {
                dispatch({
                    type: ON_DELETE_CAREER,
                    payload: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}