import {
    ON_CHANGE_TEXT_EMAIL,
    ON_CHANGE_TEXT_PASS
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_CHANGE_TEXT_EMAIL:
            return { ...state, email: action.payload };
        case ON_CHANGE_TEXT_PASS:
            return { ...state, password: action.payload };
        default:
            return state;
    }
};
