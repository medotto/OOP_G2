import * as Types from '../types';

export const SetFilter = (filters) => ({
    type: Types.SET_FILTERS,
    payload: filters
})
export const SetOrder = (field, orientation) => ({
    type: Types.SET_ORDER,
    payload: {
        field,
        orientation
    }
})
export const SetPriceRange = (values) => ({
    type: Types.SET_PRICE_RANGE,
    payload: values
})