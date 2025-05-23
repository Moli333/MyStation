import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from "./events/pages/DashboardPage";
import LoginPage from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import SpotifyCallback from './pages/SpotifyCallback';
import ProtectedRoute from './router/ProtectedRoute';

const EventApp = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/callback" element={<SpotifyCallback />} /> 
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default EventApp;