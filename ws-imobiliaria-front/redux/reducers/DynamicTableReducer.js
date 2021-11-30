import * as Types from '../types';

const initialState = [];

const DynamicTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_INITIAL_DATA:
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default DynamicTableReducer;