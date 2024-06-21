import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'
import Loader from "../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader />
    if (user) return children

    return <Navigate state={location?.pathname} to='/login' replace={true} />
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;