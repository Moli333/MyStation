import { Navigate } from "react-router-dom";
import { useUser } from "../auth/contexts/UserProvider";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { userState } = useUser();
    
    // Para debugging
    console.log("ProtectedRoute - Estado de usuario:", userState);

    if (userState.checking) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Verificando autenticación...</p>
            </div>
        );
    }

    if (!userState.logged) {
        console.log("Usuario no autenticado, redirigiendo a /login");
        return <Navigate to="/login" replace />;
    }

    console.log("Usuario autenticado, mostrando contenido protegido");
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoute;