import * as Types from '../types';

export const SetFilter = (filters) => ({
    type: Types.SET_FILTERS,
    payload: filters
})