import {
    ON_CLICK_DASHBOARD_ITEM
} from '../actions/types';

const INITIAL_STATE = {
    panelOptionSelected:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_CLICK_DASHBOARD_ITEM:
            return { ...state, panelOptionSelected: action.payload };
        default:
            return state;
    }
};

