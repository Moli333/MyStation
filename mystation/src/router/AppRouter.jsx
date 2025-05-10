import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../events/pages/HomePage";
import { LoginPage } from "../events/pages/LoginPage";
import { useContext } from "react";
import { UserContext } from "../auth/contexts/UserContext";

export const AppRouter = () => {
    const {
        userState: { logged },
    } = useContext(UserContext);

    if (!logged) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    );

};
console.log("🧭 AppRouter cargado");

