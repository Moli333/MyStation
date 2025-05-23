import { Navigate } from "react-router-dom";
import { useUser } from "../auth/contexts/UserProvider";
import Loader from "../components/Loader"; 
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { userState } = useUser();

    if (userState.checking) {
        return <Loader />;
    }

    return userState.logged ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoute;