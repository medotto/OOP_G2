import * as Types from '../types';
const initialState = {
    token: null,
    roles: null
};
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case Types.SET_USER_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        default:
            return { ...state };
    }
};

export default UserReducer;