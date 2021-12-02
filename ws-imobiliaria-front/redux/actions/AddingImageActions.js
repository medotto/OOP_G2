import * as Types from '../types';

export const SetPendingImages = (filters) => ({
    type: Types.SET_PENDING_IMAGES,
    payload: filters
})