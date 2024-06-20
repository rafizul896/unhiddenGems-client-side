import { FacebookShareButton, FacebookIcon } from 'react-share';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Shared/Loader';

const StoryDetails = () => {
    const { id } = useParams();

    const { data: story, isLoading } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/stories/${id}`);
            return data;
        }
    })

    if (isLoading) return <Loader />

    if (!story) {
        return <div>Story not found</div>;
    }

    return (
        <div className="container mx-auto md:p-4">
            <h2 className="text-3xl font-medium mb-4 text-center">{story.storyTitle}</h2>
            <img src={story.storyImage} alt={story.storyTitle} className="w-full  object-cover mb-4" />
            <div className="flex items-center justify-center py-3">
                <img src={story.author.img} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div className='flex gap-5'>
                    <p className="text-lg font-medium">By {story.author.name}</p>
                    <span>||</span>
                    <p className="">{story.postDate}</p>
                </div>
            </div>
            <p className="mb-4">{story.storyDescription}</p>
            <div className="mb-4">
                <FacebookShareButton
                    url={window.location.href}
                    quote={story.storyTitle}
                    hashtag="#touriststory"
                >
                    <FacebookIcon size={32} round />
                    <span className="ml-2">Share on Facebook</span>
                </FacebookShareButton>
            </div>
        </div>
    );
};

export default StoryDetails;