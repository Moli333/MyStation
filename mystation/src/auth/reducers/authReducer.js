<<<<<<< HEAD
<<<<<<< HEAD
import { authTypes } from '../types/authTypes';
=======
import { authTypes } from '../../types/authTypes';
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { authTypes } from '../types/authTypes';
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)

export const authReducer = (state, action) => {
    switch (action.type) {
        case authTypes.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
                errorMessage: null,
            };

        case authTypes.logout:
            return {
                logged: false,
                user: null,
                errorMessage: null,
            };

        case authTypes.errors:
            return {
                ...state,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};
