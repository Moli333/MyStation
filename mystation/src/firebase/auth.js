import { 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './config';

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
