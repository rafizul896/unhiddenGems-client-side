import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader";

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole();

    if (isLoading) return <Loader />
    if (role === 'Admin') return children
    return <Navigate to='/dashboard' />
};

AdminRoute.propTypes = {
    children: PropTypes.element
}

export default AdminRoute;