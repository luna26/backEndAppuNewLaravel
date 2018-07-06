import {
    ON_CLICK_DASHBOARD_ITEM,
    SHOW_LOADER
} from '../actions/types';

const INITIAL_STATE = {
    panelOptionSelected: 2,
    showLoader: false,
    infoCareersDropdown:null,
    carrerSelected:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_CLICK_DASHBOARD_ITEM:
            return { ...state, panelOptionSelected: action.payload.option, carrerSelected:action.payload.optionCareer  };
        case SHOW_LOADER:
            return { ...state, showLoader: action.payload };
            break;
        default:
            return state;
    }
};

