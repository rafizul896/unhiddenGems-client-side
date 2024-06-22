import { Helmet } from "react-helmet";
import TourismGuideSection from "./TourismGuideSection";
import Banner from "./Banner/Banner";
import SectionTitle from "../../components/Shared/SectionTitle";
import TourTypeSection from "./TourTypeSection";
import TouristStorySection from "./TouristStorySection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Tourist Guide</title>
            </Helmet>
            {/* Home */}
            <Banner />
            <div className="py-5">
                <SectionTitle heading={'Tourism and Travel Guide Section'} />
                <TourismGuideSection />
                <div className="pt-10">
                    <TourTypeSection />
                </div>
                <TouristStorySection />
            </div>
        </div>
    );
};

export default Home;