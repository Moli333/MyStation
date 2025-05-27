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
        console.log("Usuario de Google:", user);
        
        // Crear un objeto de usuario con los campos necesarios
        const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error("Error al iniciar sesión con Google", error);
        throw error;
    }
};

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log("Usuario de Facebook:", user);
        
        // Crear un objeto de usuario con los campos necesarios
        const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error("Error al iniciar sesión con Facebook", error);
        throw error;
    }
};

export const signInWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario con email/password:", user);
        
        // Crear un objeto de usuario con los campos necesarios
        const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName || email.split('@')[0],
            photoURL: user.photoURL,
        };
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error("Error al iniciar sesión con Email/Password", error);
        throw error;
    }
};

export const registerWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        
        // Crear un objeto de usuario con los campos necesarios
        const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName || email.split('@')[0],
            photoURL: user.photoURL || null,
        };
        
        return userData;
    } catch (error) {
        console.error("Error al registrarse con Email/Password", error);
        throw error; // Re-lanzar el error para poder manejarlo en el componente
    }
};
