// src/AppRouter.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { HomePage } from "../events/pages/HomePage";
<<<<<<< HEAD
<<<<<<< HEAD
import { LoginPage } from "../auth/pages/LoginPage";
<<<<<<< HEAD
=======
import { LoginPage } from "../events/pages/LoginPage";
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { LoginPage } from "../auth/pages/LoginPage";
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
import { useContext } from "react";
=======
import { RegisterPage } from "../auth/pages/RegisterPage";
import SpotifyCallback from "../pages/SpotifyCallback";
>>>>>>> 8fc3168 (Se guardan cambios generados en pro de mejorar el acople de Spotify y Firebase en la APP)
import { UserContext } from "../auth/contexts/UserContext";

const generateRandomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

export const AppRouter = () => {
    const {
        userState: { logged },
    } = useContext(UserContext);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
    if (logged) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
}

<<<<<<< HEAD
=======
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
    if (!logged) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
=======
    useEffect(() => {
        const state = generateRandomString(16);
        localStorage.setItem("spotify_auth_state", state);
    }, []);
>>>>>>> 8fc3168 (Se guardan cambios generados en pro de mejorar el acople de Spotify y Firebase en la APP)

    return (
        <Routes>
            <Route path="/callback" element={<SpotifyCallback />} />

            {logged ? (
                <>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
console.log("🧭 AppRouter cargado");

>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
