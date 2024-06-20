import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import SectionTitle from '../../components/Shared/SectionTitle';
const TouristStorySection = () => {

    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/stories?size=${4}`)
            return data;
        }
    })

    console.log(stories)
    return (
        <div>
            <SectionTitle heading={'Tourist Stories'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                {stories.map((story) => (
                    <Link to={'/'} key={story?._id}>
                        <div
                            className="story-card bg-white p-4 rounded shadow cursor-pointer"
                        >
                            <img src={story.storyImage} alt={story.title} className="w-full h-48 object-cover mb-4 rounded" />
                            <h3 className="text-xl font-semibold">{story.storyTitle}</h3>
                            <p>{story.storyDescription.slice(0, 80)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to='/allPackages' className='flex justify-center items-center'><button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">All Stories</button></Link>
        </div>
    );
};

export default TouristStorySection;
