import {
    ON_LOAD_NEWS,
    ON_OPEN_MODAL_NEW_UPLOAD,
    UPLOAD_NEW_REQUEST
} from '../actions/types';

const INITIAL_STATE = {
    news: null,
    openNewUploadModal: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_OPEN_MODAL_NEW_UPLOAD:
            return { ...state, openNewUploadModal: action.payload };
            break;
        case ON_LOAD_NEWS:
            return { ...state, news: action.payload };
            break;
        case UPLOAD_NEW_REQUEST:
            return { ...state};
            break;
        default:
            return state;
    }
};
