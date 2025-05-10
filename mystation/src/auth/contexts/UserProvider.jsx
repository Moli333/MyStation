import { useReducer } from 'react';
import { UserContext } from './UserContext';
import { authReducer } from '../reducers/authReducer';
<<<<<<< HEAD
import { useAuthenticate } from "../../hooks/useAuthenticate";
=======
import { useAuthenticate } from '../hooks/useAuthenticate';
>>>>>>> 66cafe3 (Guardar cambios de estructura)

const authInitialState = {
    logged: false,
    user: null,
    errorMessage: null,
};

const init = () => {
<<<<<<< HEAD
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user
            ? { logged: true, user, errorMessage: null }
            : authInitialState;
    } catch (e) {
        console.warn("Invalid user in localStorage");
        return authInitialState;
    }
=======
    const user = JSON.parse(localStorage.getItem('user'));
    return user
        ? { logged: true, user, errorMessage: null }
        : authInitialState;
>>>>>>> 66cafe3 (Guardar cambios de estructura)
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
