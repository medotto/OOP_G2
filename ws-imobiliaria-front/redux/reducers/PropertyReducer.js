import * as Types from '../types';

const initialState = {
    refreshProperties: false,
    activeProperty: null
};

const PropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_ACTIVE_PROPERTY:
            return { ...state, activeProperty: action.payload };
        case Types.POP_ACTIVE_PROPERTY:
            return { ...state, activeProperty: null };
        case Types.REFRESH_PROPERTIES:
            return { ...state, refreshProperties: action.payload };
        default:
            return state;
    }
};

export default PropertyReducer;