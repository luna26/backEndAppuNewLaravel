import {
    ON_LOAD_NEWS,
    ON_OPEN_MODAL_NEW_UPLOAD,
    UPLOAD_IMAGE_COMPLETED,
    DELETE_NEW_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    news: null,
    openNewUploadModal: false,
    showLoader: false,
    mountComponentAgain: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_OPEN_MODAL_NEW_UPLOAD:
            return { ...state, openNewUploadModal: action.payload };
            break;
        case ON_LOAD_NEWS:
            return { ...state, news: action.payload, mountComponentAgain: false };
            break;
        case UPLOAD_IMAGE_COMPLETED:
            return { ...state, openNewUploadModal: false, mountComponentAgain: true };
            break;
        case DELETE_NEW_SUCCESS:
            return { ...state, mountComponentAgain: true };
            break;
        default:
            return state;
    }
};
