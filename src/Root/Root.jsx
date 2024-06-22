import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const Root = () => {
    return (
        <div className="font-poppins">
            <div className="w-[90%] md:w-[90%] lg:w-[80%] mx-auto max-w-[1440px]">
                <Navbar />
                <div className="min-h-[calc(100vh-324px)]">
                    <Outlet />
                </div>
            </div>
            <div className="bg-[url('https://i.ibb.co/BPqXNY7/7.png')] text-white bg-cover bg-no-repeat">
                <Footer />
            </div>
        </div>
    );
};

export default Root;