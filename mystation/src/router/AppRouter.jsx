// src/AppRouter.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { HomePage } from "../events/pages/HomePage";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import SpotifyCallback from "../pages/SpotifyCallback";
import { UserContext } from "../auth/contexts/UserContext";

const generateRandomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

export const AppRouter = () => {
    const {
        userState: { logged },
    } = useContext(UserContext);

    useEffect(() => {
        const state = generateRandomString(16);
        localStorage.setItem("spotify_auth_state", state);
    }, []);

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
