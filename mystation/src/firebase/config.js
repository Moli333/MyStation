import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7qFSO7yG7CVQCVrH3dUVVXRC4O271GS8",
    authDomain: "my-station-8ad14.firebaseapp.com",
    projectId: "my-station-8ad14",
    storageBucket: "my-station-8ad14.appspot.com",
    messagingSenderId: "483099678180",
    appId: "1:483099678180:web:547863501c457e0af163f1",
    measurementId: "G-5ZCRVJHHQB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const emailProvider = new EmailAuthProvider();
export const firebaseAuth = getAuth(app);
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmail = (email) => {
    const emailProvider = new EmailAuthProvider();
    return signInWithPopup(auth, emailProvider);
};