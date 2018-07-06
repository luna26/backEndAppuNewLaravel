import {
    ON_LOAD_NEWS,
    ON_OPEN_MODAL_NEW_UPLOAD,
    UPLOAD_IMAGE_COMPLETED,
    DELETE_NEW_SUCCESS,
    OPEN_UPDATE_MODAL,
    UPDATE_NEW_INFO_READY,
    UPDATE_INFO_COMPLETED,
    UPDATE_INFO_CHANGE_TITLE,
    UPDATE_INFO_CHANGE_DESC
} from '../actions/types';

const INITIAL_STATE = {
    news: null,
    openNewUploadModal: false,
    showLoader: false,
    mountComponentAgain: false,
    openModalUpdate: false,
    updateInfo: null,
    updateTitle: '',
    updateDesc: ''
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
        case OPEN_UPDATE_MODAL:
            return { ...state, openModalUpdate: action.payload, updateInfo: null };
            break;
        case UPDATE_NEW_INFO_READY:
            return { ...state, updateInfo: action.payload.data, updateTitle:action.payload.data[0].news_title, updateDesc: action.payload.data[0].news_desc};
            break;
        case UPDATE_INFO_COMPLETED:
            return { ...state, updateInfo: null, openModalUpdate: false, mountComponentAgain: true };
            break;
        case UPDATE_INFO_CHANGE_TITLE:
            return { ...state, updateTitle:action.payload };
            break;
        case UPDATE_INFO_CHANGE_DESC:
            return { ...state, updateDesc:action.payload };
            break;
        default:
            return state;
    }
};
