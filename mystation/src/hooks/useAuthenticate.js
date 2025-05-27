import {
    signInWithEmailAndPassword,
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signOut, 
} from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { authTypes } from "../auth/types/authTypes";

export const useAuthenticate = (dispatch) => {
    // Función para verificar la sesión actual al iniciar la app
    const checkAuthStatus = () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData && userData.email && userData.uid) {
                console.log("Usuario encontrado en localStorage:", userData);
                dispatch({ type: authTypes.login, payload: userData });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al verificar el estado de autenticación:", error);
            return false;
        }
    };
    
    const loginWithFirebase = async ({ email, password }) => {
        try {
            console.log("Intentando iniciar sesión con email:", email);
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            console.log("Inicio de sesión exitoso, user:", user);

            const userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName || email.split('@')[0],
                photoURL: user.photoURL || null,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: authTypes.login, payload: userData });
            console.log("Usuario guardado en localStorage y estado actualizado");
            return userData; // Return the user data for confirmation

        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Credenciales inválidas';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Este correo no está registrado.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Contraseña incorrecta.';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Credenciales inválidas.';
            }
            dispatch({ type: authTypes.errors, payload: errorMessage });
            throw error; // Re-throw to allow handling in the component
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;

            const userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: authTypes.login, payload: userData });

        } catch (error) {
            console.error('Google login error:', error);
            dispatch({ type: authTypes.errors, payload: 'Error al iniciar sesión con Google' });
        }
    };

    const loginWithFacebook = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;

            const userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: authTypes.login, payload: userData });

        } catch (error) {
            console.error('Facebook login error:', error);
            dispatch({ type: authTypes.errors, payload: 'Error al iniciar sesión con Facebook' });
        }
    };

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: authTypes.login, payload: user });
    };

    const logout = async () => {
        try {
            await signOut(firebaseAuth);
        } catch (error) {
            console.warn('Sign out error or not logged in:', error);
        }
        localStorage.removeItem('user');
        dispatch({ type: authTypes.logout });
    };

    return {
        login,
        loginWithFirebase,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        checkAuthStatus, // Exponer la función para verificar el estado de autenticación
    };
};
