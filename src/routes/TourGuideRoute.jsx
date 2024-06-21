import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types';

const TourGuideRoute = ({ children }) => {
    const { role, isLoading } = useRole();

    if (isLoading) return <Loader />
    if (role === 'Tour Guide') return children
    return <Navigate to='/dashboard' />
};

TourGuideRoute.propTypes = {
    children: PropTypes.node
}

export default TourGuideRoute;