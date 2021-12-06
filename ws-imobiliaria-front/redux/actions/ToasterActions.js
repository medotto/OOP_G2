import * as Types from '../types';

export const PushToaster = (toasterType, toasterMessage, duration = 3000) => ({
    type: Types.PUSH_TOASTER,
    payload: {
        type: toasterType,
        message: toasterMessage,
        duration: duration
    }
})

export const PopToaster = () => ({
    type: Types.POP_TOASTER
})