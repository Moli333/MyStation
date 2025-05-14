import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../events/pages/HomePage";
<<<<<<< HEAD
<<<<<<< HEAD
import { LoginPage } from "../auth/pages/LoginPage";
=======
import { LoginPage } from "../events/pages/LoginPage";
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { LoginPage } from "../auth/pages/LoginPage";
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
import { useContext } from "react";
import { UserContext } from "../auth/contexts/UserContext";

export const AppRouter = () => {
    const {
        userState: { logged },
    } = useContext(UserContext);

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

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
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
