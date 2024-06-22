import { FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../../hooks/useAxiosCommon';
import Loader from '../../../components/Shared/Loader';
import SectionTitle from '../../../components/Shared/SectionTitle';
import StoryCard from '../../../components/card/StoryCard';

const AllStories = () => {
    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/stories')
            return data;
        }
    })

    if (isLoading) return <Loader />

    return (
        <div className='pb-10'>
            <SectionTitle heading={'All Stories'} />
            <div className="mb-4">
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaSearch className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."

                        className="w-full px-2 py-1 outline-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => <StoryCard key={story._id} story={story} />)}
            </div>
        </div>
    );
};

export default AllStories;