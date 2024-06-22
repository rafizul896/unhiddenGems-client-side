import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInAnimationsVariants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index
        }
    }),
}

const tourTypes = [
    { type: 'Hiking', icon: '🏔️', route: '/packages/hiking' },
    { type: 'Sports', icon: '⚽', route: '/packages/sports' },
    { type: 'Walking', icon: '🚶', route: '/packages/walking' },
    { type: 'Wildlife', icon: '🐻', route: '/packages/wildlife' },
    { type: 'Air Rides', icon: '🎈', route: '/packages/air-rides' }
];

const TourTypeSection = () => {

    return (
        <div className="tour-type-section py-10 border-2">
            <h2 className="text-4xl font-semibold text-center mb-6">Find a Tour by <br />TOUR TYPE</h2>
            <div className="flex justify-center gap-5 flex-wrap">
                {tourTypes.map((tour, index) => (
                    <Link to={tour.route} key={tour.type}>
                        <motion.div
                            variants={fadeInAnimationsVariants}
                            initial='initial'
                            whileInView="animate"
                            // viewport={{
                            //     once: true,
                            // }}
                            custom={index}
                            className="tour-type-item text-center cursor-pointer p-4">
                            <div className="text-6xl mb-2">{tour.icon}</div>
                            <div className="text-xl font-semibold">{tour.type}</div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TourTypeSection;
