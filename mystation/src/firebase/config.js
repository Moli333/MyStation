// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const firebaseAuth = getAuth(app);
