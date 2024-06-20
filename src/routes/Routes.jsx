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
            }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/dashboard',
        element: <DashBoard />,
        children: [
            {
                index: true,
                element: <Profile />
            },
            // 
            {
                path: 'my-bookings',
                element: <MyBookings />
            },
            {
                path: 'my-wishlist',
                element: <MyWishlist />
            },
            //
            {
                path: 'assigned-tours',
                element: <MyAssignedTours />
            },
            // 
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'add-package',
                element: <AddPackage />
            }
        ]
    }
])