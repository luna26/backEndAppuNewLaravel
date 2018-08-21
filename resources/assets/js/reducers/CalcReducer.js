import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_COURSES_CAREERS,
    ON_LOAD_SCHEDULE_COURSE
} from '../actions/types';

const INITIAL_STATE = {
    schedules: null,
    courses: null,
    coursesCareer: null,
    scheduleCareer:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_SCHEDULES_CALC:
            return { ...state, schedules: action.payload.data };
        case ON_LOAD_COURSES_CAL:
            return { ...state, courses: action.payload.data };
        case ON_LOAD_COURSES_CAREERS:
            return { ...state, coursesCareer: action.payload.data };
        case ON_LOAD_SCHEDULE_COURSE:
            return { ...state, scheduleCareer: action.payload.data };
        default:
            return state;
    }
};