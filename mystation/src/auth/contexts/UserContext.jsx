import React, { createContext, useContext, useReducer } from "react";
import { useAuthenticate } from "../../hooks/useAuthenticate";
import { authReducer } from "../reducers/authReducer";

export const UserContext = createContext();

const authInitialState = {
    logged: false,
    user: null,
    errorMessage: null,
};

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user
        ? { logged: true, user, errorMessage: null }
        : authInitialState;
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
