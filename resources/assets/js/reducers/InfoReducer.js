import {
    ON_LOAD_INFO_DASHBOARD
} from '../actions/types';

const INITIAL_STATE = {
    info:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_INFO_DASHBOARD:
            return { ...state, info: action.payload };
        default:
            return state;
    }
};
