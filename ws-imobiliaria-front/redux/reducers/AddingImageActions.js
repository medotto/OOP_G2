import * as Types from '../types';

const initialState = [];

const AddingImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PENDING_IMAGES:
            return state.concat(state, action.payload);
        default:
            return state;
    }
};

export default AddingImageReducer;