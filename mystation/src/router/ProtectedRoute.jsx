import { Navigate } from "react-router-dom";
import { useUser } from "../auth/contexts/UserProvider";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { userState } = useUser();

    if (userState.checking) {
        return <div>Cargando usuario...</div>;
    }

    if (!userState.logged) {
        return <Navigate to="/login" replace />;
    }

    return  children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoute;