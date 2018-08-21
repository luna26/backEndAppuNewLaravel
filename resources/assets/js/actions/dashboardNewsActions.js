import axios from 'axios';
import {
    ON_LOAD_NEWS,
    ON_CLICK_DASHBOARD_ITEM,
    ON_OPEN_MODAL_NEW_UPLOAD,
    UPLOAD_NEW_REQUEST, SHOW_LOADER,
    UPLOAD_IMAGE_COMPLETED,
    DELETE_NEW_SUCCESS,
    OPEN_UPDATE_MODAL,
    UPDATE_NEW_INFO_READY,
    UPDATE_INFO_COMPLETED,
    UPDATE_INFO_CHANGE_TITLE,
    UPDATE_INFO_CHANGE_DESC
} from './types';
import history from '../history';
import {URL_SERVER} from '../config';

export const onLoadNews = () => {
    return dispatch => {
        axios.post(URL_SERVER+"/getNewsDashboard", '', {
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

export const clickOptionPanel = (option, optionCareer) => {
    return dispatch => {
        dispatch({
            type: ON_CLICK_DASHBOARD_ITEM,
            payload: {
                option:option,
                optionCareer:optionCareer
            }
        });
    }
}

export const onClickOpen = (open) => {
    return dispatch => {
        dispatch({
            type: ON_OPEN_MODAL_NEW_UPLOAD,
            payload: open
        });
    };
}

export const uploadNewRequest = (title, desc, file) => {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER,
            payload: true
        });
        let formData = new FormData();

        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('file', file);
        axios.post(URL_SERVER+"/uploadNew", formData)
            .then(function (response) {
                setTimeout(function () {
                    dispatch({
                        type: UPLOAD_IMAGE_COMPLETED,
                        payload: false
                    });
                    dispatch({
                        type: SHOW_LOADER,
                        payload: false
                    });
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export const deleteNew = (id) => {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER,
            payload: true
        });
        axios.post(URL_SERVER+"/deleteNew", { id: id })
            .then(function (response) {
                setTimeout(function () {
                    dispatch({
                        type: DELETE_NEW_SUCCESS,
                        payload: false
                    });
                    dispatch({
                        type: SHOW_LOADER,
                        payload: false
                    });
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const openUpdateModal = (open, id) => {
    return dispatch => {
        if (id) {
            dispatch({
                type: OPEN_UPDATE_MODAL,
                payload: true
            });
            axios.post(URL_SERVER+"/getNewUpdate", { id: id })
                .then(function (response) {
                    dispatch({
                        type: UPDATE_NEW_INFO_READY,
                        payload: response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            dispatch({
                type: OPEN_UPDATE_MODAL,
                payload: open
            });
        }
    }
}

export const updateNew = (id, title, desc) => {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER,
            payload: true
        });
        axios.post(URL_SERVER+"/updateNew", { id: id, title: title, desc: desc })
            .then(function (response) {
                dispatch({
                    type: UPDATE_INFO_COMPLETED,
                    payload: true
                });
                dispatch({
                    type: SHOW_LOADER,
                    payload: false
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const onChangeTitleUpdate = (text) => {
    return dispatch => {
        dispatch({
            type: UPDATE_INFO_CHANGE_TITLE,
            payload: text
        });
    }
}

export const onChangeDescUpdate = (text) => {
    return dispatch => {
        dispatch({
            type: UPDATE_INFO_CHANGE_DESC,
            payload: text
        });
    }
}