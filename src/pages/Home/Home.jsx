import { Helmet } from "react-helmet";
import TourismGuideSection from "./TourismGuideSection";
import Banner from "./Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Tourist Guide</title>
            </Helmet>
            {/* Home */}
            <Banner/>
            <div>
                <h1 className="text-2xl text-center">Tourist Guide</h1>
                <TourismGuideSection />
            </div>
        </div>
    );
};

export default Home;