import { Helmet } from "react-helmet";
import TourismGuideSection from "./TourismGuideSection";
import Banner from "./Banner/Banner";
import SectionTitle from "../../components/Shared/SectionTitle";
import TourTypeSection from "./TourTypeSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Tourist Guide</title>
            </Helmet>
            {/* Home */}
            <Banner />
            <div>
                <SectionTitle heading={'Tourist Guide'} />
                <TourismGuideSection />
                <div className="py-5">
                    <TourTypeSection />
                </div>
            </div>
        </div>
    );
};

export default Home;