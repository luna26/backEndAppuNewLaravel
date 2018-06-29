import axios from 'axios';

import {
    ON_CLICk_SEND_FORM,
    ON_CHANGE_TEXT_EMAIL,
    ON_CHANGE_TEXT_PASS
} from './types';

export const onClickSendLogin = (username, password) => {
    return dispatch => {
        axios.post("http://localhost:3232/api/login",'foo', {
                headers: {
                }
            })
            .then(function (response) {
                dispatch({
                    type: ON_CLICk_SEND_FORM,
                    payload: {
                        username: username,
                        password: password,
                        token: csrf_token
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const onChangeTextEmail = (text) => {
    return dispatch => {
        dispatch({
            type: ON_CHANGE_TEXT_EMAIL,
            payload: text
        });
    };
}

export const onChangeTextPass = (text) => {
    return dispatch => {
        dispatch({
            type: ON_CHANGE_TEXT_PASS,
            payload: text
        });
    };
}