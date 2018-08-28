import {
    ON_LOAD_SCHEDULES_CALC,
    ON_LOAD_COURSES_CAL,
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_SCHEDULE_COURSE,
    ON_LOAD_COURSES_CAREERS,
    ON_ADD_CAREER_COURSE_ERROR,
    ON_ADD_CAREER_COURSE,
    RELOAD_COURSES_CAREER,
    ON_DELETE_CAREER_COURSE,
    ON_LOAD_DAYS,
    ON_LOAD_INFO_CALCULATOR,
    SHOW_LOADER_CALC
} from '../actions/types';

const INITIAL_STATE = {
    schedules: null,
    courses: null,
    careers: null,
    scheduleCareer: null,
    coursesCareer: null,
    coursesCarrerError: '',
    reloadCoursesCareer: false,
    days: null,
    calculatorInfo: null,
    loadModal: false
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
            return { ...state, loadModal: false, coursesCarrerError: '', reloadCoursesCareer: true, coursesCarrerError: 'Curso agregado a carrera correctamente' };
        case ON_ADD_CAREER_COURSE_ERROR:
            return { ...state, loadModal: false, coursesCarrerError: 'Combinacion ya existe' };
        case RELOAD_COURSES_CAREER:
            return { ...state, loadModal: false, reloadCoursesCareer: action.payload, loadModal: false };
        case ON_DELETE_CAREER_COURSE:
            return { ...state, loadModal: false, reloadCoursesCareer: true };
        case ON_LOAD_DAYS:
            return { ...state, days: action.payload };
        case ON_LOAD_INFO_CALCULATOR:
            return { ...state, calculatorInfo: action.payload };
        case SHOW_LOADER_CALC:
            return { ...state, loadModal: action.payload };
        default:
            return state;
    }
};