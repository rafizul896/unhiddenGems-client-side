import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashBoard from "../Root/DashBoard";
import PackageDetailsPage from "../pages/PackageDetails/PackageDetailsPage";
import TourGuideProfile from "../pages/TourGuide/TourGuideProfile";

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
            }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/dashboard',
        element: <DashBoard />
    }
])