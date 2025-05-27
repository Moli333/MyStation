import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCK8_cjKtFLVip10hh_j_QbSfHk8iAz83M",
  authDomain: "my-status2.firebaseapp.com",
  projectId: "my-status2",
  storageBucket: "my-status2.appspot.com", // Corregido de .firebasestorage.app a .appspot.com
  messagingSenderId: "1070715956882",
  appId: "1:1070715956882:web:889ed608c3591d66a1c04b",
  measurementId: "G-L6WGVB7RMC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Auth services
export const auth = getAuth(app);
export const firebaseAuth = auth; // Para mantener compatibilidad con código existente

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const emailProvider = new EmailAuthProvider();

// Simple auth methods (usados en el archivo auth.js)
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);