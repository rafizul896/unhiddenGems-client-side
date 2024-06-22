import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import SectionTitle from '../../components/Shared/SectionTitle';
import StoryCard from '../../components/card/StoryCard';
import { motion } from "framer-motion";

const fadeInAnimationsVariants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1
        }
    },
}

const TouristStorySection = () => {
    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/stories?size=${4}`)
            return data;
        }
    })

    return (
        <div>
            <SectionTitle heading={'Tourist Stories'} />
            <motion.div
                variants={fadeInAnimationsVariants}
                initial='initial'
                whileInView="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stories.map(story => <StoryCard key={story._id} story={story} />)}
            </motion.div>
            <Link to='/allStories' className='flex justify-center items-center'><button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">All Stories</button></Link>
        </div>
    );
};

export default TouristStorySection;
