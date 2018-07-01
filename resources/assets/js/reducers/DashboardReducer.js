import {
    ON_CLICK_DASHBOARD_ITEM,
    SHOW_LOADER
} from '../actions/types';

const INITIAL_STATE = {
    panelOptionSelected: null,
    showLoader:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_CLICK_DASHBOARD_ITEM:
            return { ...state, panelOptionSelected: action.payload };
        case SHOW_LOADER:
            return { ...state, showLoader: action.payload };
            break;
        default:
            return state;
    }
};

