import * as Types from '../types';

export const SetUserToken = (token) => ({
    type: Types.SET_USER_TOKEN,
    payload: token
})
export const SetUserRoles = (roles) => ({
    type: Types.SET_USER_ROLES,
    payload: roles
})