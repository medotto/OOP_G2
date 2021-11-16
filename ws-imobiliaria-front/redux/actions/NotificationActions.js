import * as Types from '../types';

export const PushNotification = (toasterType, toasterMessage) => ({
    type: Types.PUSH_NOTIFICATION,
    payload: {
        type: toasterType,
        message: toasterMessage
    }
})

export const PopNotification = (messageId) => ({
    type: Types.POP_NOTIFICATION,
    payload: {
        messageId
    }
})