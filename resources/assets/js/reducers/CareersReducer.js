import {
    ON_LOAD_CAREERS,
    ON_POST_CAREER_COMPLETED,
    ON_DELETE_CAREER
} from '../actions/types';

const INITIAL_STATE = {
    infoCareers: null,
    loadComponentAgain: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_CAREERS:
            return { ...state, infoCareers: action.payload.data, loadComponentAgain: false };
            break;
        case ON_POST_CAREER_COMPLETED:
            return { ...state, loadComponentAgain: true };
            break;
        case ON_DELETE_CAREER:
            return { ...state, loadComponentAgain: true };
            break;
        default:
            return state;
    }
};