import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashBoard from "../Root/DashBoard";
import PackageDetailsPage from "../pages/PackageDetails/PackageDetailsPage";
import TourGuideProfile from "../pages/TourGuide/TourGuideProfile";
import Profile from "../pages/Dashboard/Common/Profile";
import MyBookings from "../pages/Dashboard/Tourist/MyBookings";
import MyWishlist from "../pages/Dashboard/Tourist/MyWishlist";
import MyAssignedTours from "../pages/Dashboard/TourGuide/MyAssignedTours";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddPackage from "../pages/Dashboard/Admin/AddPackage";
import AllPackages from "../pages/Others/AllPackages";
import PackagesPage from "../pages/Others/PackagesPage";
import StoryDetails from "../pages/Home/StoryDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TourGuideRoute from "./TourGuideRoute";
import AllStories from "../pages/Dashboard/Tourist/AllStories";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/packageDetails/:id',
                element: <PackageDetailsPage />
            },
            {
                path: '/tourGuideProfile/:id',
                element: <TourGuideProfile />
            },
            {
                path: '/allPackages',
                element: <AllPackages />
            },
            {
                path: '/packages/:type',
                element: <PackagesPage />
            },
            {
                path: '/stories/:id',
                element: <StoryDetails />
            },
            {
                path: 'allStories',
                element: <AllStories />
            }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashBoard />
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <Profile />
            },
            // Normal user/ Tourist
            {
                path: 'my-bookings',
                element: <MyBookings />
            },
            {
                path: 'my-wishlist',
                element: <MyWishlist />
            },
            //TourGuideRoute
            {
                path: 'assigned-tours',
                element: <TourGuideRoute>
                    <MyAssignedTours />
                </TourGuideRoute>
            },
            // Admin Routes
            {
                path: 'manage-users',
                element: <AdminRoute>
                    <ManageUsers />
                </AdminRoute>
            },
            {
                path: 'add-package',
                element: <AdminRoute>
                    <AddPackage />
                </AdminRoute>
            }
        ]
    }
])