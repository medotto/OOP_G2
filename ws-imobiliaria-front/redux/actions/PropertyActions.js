import * as Types from '../types';

export const SetActiveProperty = (property) => ({
    type: Types.SET_ACTIVE_PROPERTY,
    payload: property
})
export const PopActiveProperty = () => ({
    type: Types.POP_ACTIVE_PROPERTY
})
export const RefreshProperties = (refreshProperties) => ({
    type: Types.REFRESH_PROPERTIES,
    payload: refreshProperties
})