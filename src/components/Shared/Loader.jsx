import { ScaleLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <ScaleLoader size={100} color="#00aa6c" />
        </div>
    );
};

export default Loader;