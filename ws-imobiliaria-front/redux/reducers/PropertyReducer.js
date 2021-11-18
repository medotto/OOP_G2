import * as Types from '../types';

const initialState = {
    activeProperty: null
};

const PropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_ACTIVE_PROPERTY:
            console.log("got here");
            return { ...state, activeProperty: action.payload };
        default:
            return state;
    }
};

export default PropertyReducer;