import { Helmet } from "react-helmet";
import TourismGuideSection from "./TourismGuideSection";
import Banner from "./Banner/Banner";
import SectionTitle from "../../components/Shared/SectionTitle";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Tourist Guide</title>
            </Helmet>
            {/* Home */}
            <Banner/>
            <div>
                <SectionTitle heading={'Tourist Guide'}/>
                <TourismGuideSection />
            </div>
        </div>
    );
};

export default Home;