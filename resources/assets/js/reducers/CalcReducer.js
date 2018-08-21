import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_SCHEDULE_COURSE,
    ON_LOAD_COURSES_CAREERS,
    ON_ADD_CAREER_COURSE_ERROR,
    ON_ADD_CAREER_COURSE,
    RELOAD_COURSES_CAREER,
    ON_DELETE_CAREER_COURSE
} from '../actions/types';

const INITIAL_STATE = {
    schedules: null,
    courses: null,
    careers: null,
    scheduleCareer: null,
    coursesCareer: null,
    coursesCarrerError: '',
    reloadCoursesCareer: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_SCHEDULES_CALC:
            return { ...state, schedules: action.payload.data };
        case ON_LOAD_COURSES_CAL:
            return { ...state, courses: action.payload.data };
        case ON_LOAD_CAREERS_CALC:
            return { ...state, careers: action.payload.data };
        case ON_LOAD_SCHEDULE_COURSE:
            return { ...state, scheduleCareer: action.payload.data };
        case ON_LOAD_COURSES_CAREERS:
            return { ...state, coursesCareer: action.payload.data, coursesCarrerError: '', reloadCoursesCareer: false };
        case ON_ADD_CAREER_COURSE:
            return { ...state, coursesCarrerError: '', reloadCoursesCareer: true, coursesCarrerError: 'Curso agregado a carrera correctamente' };
        case ON_ADD_CAREER_COURSE_ERROR:
            return { ...state, coursesCarrerError: 'Combinacion ya existe' };
        case RELOAD_COURSES_CAREER:
            return { ...state, reloadCoursesCareer: action.payload };
        case ON_DELETE_CAREER_COURSE:
            return { ...state, reloadCoursesCareer: true };
        default:
            return state;
    }
};