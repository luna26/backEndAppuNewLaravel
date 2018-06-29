import axios from 'axios';
import { ON_LOAD_NEWS, ON_CLICK_DASHBOARD_ITEM, ON_OPEN_MODAL_NEW_UPLOAD, UPLOAD_NEW_REQUEST } from './types';

export const onLoadNews = () => {
    return dispatch => {
        axios.post("http://34.219.69.51/getNewsDashboard", 'FOO', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            }
        })
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_NEWS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const clickOptionPanel = (option) => {
    return dispatch => {
        dispatch({
            type: ON_CLICK_DASHBOARD_ITEM,
            payload: option
        });
    }
}

export const onClickOpen = (open) => {
    console.log('EJECT');
    return dispatch => {
        dispatch({
            type: ON_OPEN_MODAL_NEW_UPLOAD,
            payload: open
        });
    };
}

export const uploadNewRequest = (title, desc, file) => {
    console.log('VAMOS A ENVIAR', title);
    let formData = new FormData();

    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', file);
    console.log('VAMOS A ENVIAR', formData.values('title'));
    return dispatch => {
        axios.post("http://34.219.69.51/uploadNew", formData)
            .then(function (response) {
                console.log(response.data);
                dispatch({
                    type: 'tyes',
                    payload: 'tyes'
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
