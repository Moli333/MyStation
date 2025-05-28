import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from "./events/pages/DashboardPage";
import LoginPage from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import SpotifyCallback from './pages/SpotifyCallback';
import ProtectedRoute from './router/ProtectedRoute';
import { useEffect } from 'react';
import ExperienciasPage from './events/pages/ExperienciasPage';

const generateRandomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
};

const EventApp = () => {
    useEffect(() => {
        const state = generateRandomString(16);
        localStorage.setItem("spotify_auth_state", state);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/callback" element={<SpotifyCallback />} />
                <Route path="/experiencias" element={<ExperienciasPage />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default EventApp;