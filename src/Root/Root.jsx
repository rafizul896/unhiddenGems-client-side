import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-324px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;