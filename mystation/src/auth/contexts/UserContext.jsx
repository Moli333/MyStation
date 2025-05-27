import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuthenticate } from "../../hooks/useAuthenticate";
import { authReducer } from "../reducers/authReducer";

export const UserContext = createContext();

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
        console.warn("Error parsing user from localStorage", e);
        return { ...authInitialState, checking: false };
    }
};

export const UserProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(authReducer, authInitialState, init);
    const { login, logout, loginWithFirebase, loginWithGoogle, loginWithFacebook } = useAuthenticate(dispatch);
    
    // Log estado inicial
    useEffect(() => {
        console.log("Estado inicial de autenticación:", userState);
    }, []);

    return (
        <UserContext.Provider 
            value={{ 
                userState, 
                login, 
                logout, 
                loginWithFirebase,
                loginWithGoogle,
                loginWithFacebook
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
