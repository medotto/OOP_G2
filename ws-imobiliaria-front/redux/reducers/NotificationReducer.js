import * as Types from '../types';

const initialState = [];

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.PUSH_NOTIFICATION:
            return state.push({
                messageId: state.length - 1,
                title: action.payload.title,
                message: action.payload.message
            });
        case Types.POP_NOTIFICATION:
            return state.splice(action.payload.messageId, 1);
        default:
            return state;
    }
};

export default NotificationReducer;