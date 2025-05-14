import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { authTypes } from "../auth/types/authTypes";

export const useAuthenticate = (dispatch) => {
    // Login con Firebase
    const loginWithFirebase = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;

            const userData = {
                email: user.email,
                uid: user.uid,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: authTypes.login, payload: userData });

        } catch (error) {
            console.error('Login error:', error);
            dispatch({ type: authTypes.errors, payload: 'Credenciales inválidas' });
        }
    };

    // Login directo con un objeto de usuario (sin Firebase)
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

    return { login, loginWithFirebase, logout };
};
