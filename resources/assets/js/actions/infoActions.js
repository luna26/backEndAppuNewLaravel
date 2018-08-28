import axios from 'axios';
import {
    ON_LOAD_INFO_DASHBOARD,
    SHOW_LOADER_CALC
} from './types';
import { URL_SERVER } from '../config';

export const getInfoDashboard = () => {

    return dispatch => {
        axios.post(URL_SERVER + "/getInfoCalculator", '', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_INFO_DASHBOARD,
                    payload: response.data[0]
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const updateInfoDetails = (info_details) => {

    let data = {
        info_details: info_details
    }

    return dispatch => {
        dispatch({
            type: SHOW_LOADER_CALC,
            payload: true
        });

        axios.post(URL_SERVER + "/updateInfoDetails", data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(function (response) {
                dispatch({
                    type: SHOW_LOADER_CALC,
                    payload: false
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}