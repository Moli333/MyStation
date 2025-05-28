//src/auth/contexts/UserProvider.jsx
import { useReducer, useContext, useEffect } from 'react';
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
    const { login, logout, loginWithFirebase, loginWithGoogle, loginWithFacebook } = useAuthenticate(dispatch);

    // Agregar useEffect para debugging
    useEffect(() => {
        console.log("Estado actual del usuario en UserProvider:", userState);
    }, [userState]);

    // Verificar si hay un usuario en localStorage al montar el componente
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                if (userData && userData.email) {
                    console.log("Usuario encontrado en localStorage:", userData);
                    dispatch({ type: '[AUTH] login', payload: userData });
                }
            }
        } catch (error) {
            console.error("Error al cargar usuario desde localStorage:", error);
        }
    }, []);

    return (
        <UserContext.Provider value={{ 
            userState, 
            login, 
            logout, 
            loginWithFirebase,
            loginWithGoogle,
            loginWithFacebook
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
