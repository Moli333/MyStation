import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../events/pages/HomePage";
<<<<<<< HEAD
import { LoginPage } from "../auth/pages/LoginPage";
=======
import { LoginPage } from "../events/pages/LoginPage";
>>>>>>> 66cafe3 (Guardar cambios de estructura)
import { useContext } from "react";
import { UserContext } from "../auth/contexts/UserContext";

export const AppRouter = () => {
    const {
        userState: { logged },
    } = useContext(UserContext);

<<<<<<< HEAD
    if (logged) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
}

=======
>>>>>>> 66cafe3 (Guardar cambios de estructura)
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
<<<<<<< HEAD
=======
console.log("🧭 AppRouter cargado");

>>>>>>> 66cafe3 (Guardar cambios de estructura)
