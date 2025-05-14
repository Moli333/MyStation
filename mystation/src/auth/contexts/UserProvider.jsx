import { useReducer, useContext } from 'react';
import { UserContext } from './UserContext';
import { authReducer } from '../reducers/authReducer';
<<<<<<< HEAD
<<<<<<< HEAD
import { useAuthenticate } from "../../hooks/useAuthenticate";
=======
import { useAuthenticate } from '../hooks/useAuthenticate';
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { useAuthenticate } from "../../hooks/useAuthenticate";
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)

const authInitialState = {
    logged: false,
    user: null,
    errorMessage: null,
};

const init = () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user
            ? { logged: true, user, errorMessage: null }
            : authInitialState;
    } catch (e) {
        console.warn("Invalid user in localStorage");
        return authInitialState;
    }
<<<<<<< HEAD
=======
    const user = JSON.parse(localStorage.getItem('user'));
    return user
        ? { logged: true, user, errorMessage: null }
        : authInitialState;
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
};

export const UserProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(authReducer, authInitialState, init);
    const { login, logout } = useAuthenticate(dispatch);

    return (
        <UserContext.Provider value={{ userState, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
