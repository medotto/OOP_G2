import * as Types from '../types';

export const SetActiveProperty = (property) => ({
    type: Types.SET_ACTIVE_PROPERTY,
    payload: property
})