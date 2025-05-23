//src/auth/contexts/UserProvider.jsx
import { useReducer, useContext } from 'react';
import { UserContext } from './UserContext';
import { authReducer } from '../reducers/authReducer';
import { useAuthenticate } from "../../hooks/useAuthenticate";

const authInitialState = {
    logged: false,
    user: null,
    errorMessage: null,
    checking: true, 
};

const init = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user
            ? { logged: true, user, errorMessage: null, checking: false }
            : { ...authInitialState, checking: false };
    } catch (e) {
        console.warn("Invalid user in localStorage", e);
        return { ...authInitialState, checking: false };
    }
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
