// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// 🔧 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCK8_cjKtFLVip10hh_j_QbSfHk8iAz83M",
  authDomain: "my-status2.firebaseapp.com",
  projectId: "my-status2",
  storageBucket: "my-status2.appspot.com", // ✅ Corrección aquí
  messagingSenderId: "1070715956882",
  appId: "1:1070715956882:web:889ed608c3591d66a1c04b",
  measurementId: "G-L6WGVB7RMC",
};

// ✅ Inicialización de Firebase
export const app = initializeApp(firebaseConfig);

// 🔐 Servicios de autenticación
export const auth = getAuth(app);
export const firebaseAuth = auth; // Por compatibilidad si ya lo estás usando así

// 🧩 Proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const emailProvider = new EmailAuthProvider();

// 🔁 Métodos de autenticación simples
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithEmailPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const registerWithEmailPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
