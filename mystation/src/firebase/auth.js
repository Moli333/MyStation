// src/firebase/auth.js
import { 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './config';

// Inicio de sesión con Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error al iniciar sesión con Google", error);
    }
};

// Inicio de sesión con Facebook
export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error al iniciar sesión con Facebook", error);
    }
};

// Inicio de sesión con email y contraseña
export const signInWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error al iniciar sesión con Email/Password", error);
    }
};

// Registro con email y contraseña
export const registerWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error al registrarse con Email/Password", error);
    }
};
