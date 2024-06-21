import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import SectionTitle from '../../components/Shared/SectionTitle';
import StoryCard from '../../components/card/StoryCard';
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-4">
                {stories.map(story => <StoryCard key={story._id} story={story} />)}
            </div>
            <Link to='/allStories' className='flex justify-center items-center'><button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">All Stories</button></Link>
        </div>
    );
};

export default TouristStorySection;
