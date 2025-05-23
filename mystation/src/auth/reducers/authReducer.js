import { authTypes } from '../types/authTypes';

export const authReducer = (state, action) => {
    switch (action.type) {
        case authTypes.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
                errorMessage: null,
                checking: false,
            };

        case authTypes.logout:
            return {
                logged: false,
                user: null,
                errorMessage: null,
                checking: false,
            };

        case authTypes.errors:
            return {
                ...state,
                errorMessage: action.payload,
                checking: false,
            };

        default:
            return state;
    }
};
