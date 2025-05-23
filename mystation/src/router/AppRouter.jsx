import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "../events/pages/HomePage";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import SpotifyCallback from "../pages/SpotifyCallback";
import ProtectedRoute from "../router/ProtectedRoute";

const generateRandomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
};

export const AppRouter = () => {
    useEffect(() => {
        const state = generateRandomString(16);
        localStorage.setItem("spotify_auth_state", state);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/callback" element={<SpotifyCallback />} />

                {/* Rutas públicas */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas protegidas */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};
