import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const StoryCard = ({ story }) => {
    return (
        <Link to={`/stories/${story._id}`}>
            <div className="bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-lg shadow-md overflow-hidden border">
                <img src={story?.storyImage} alt={story.storyTitle} className="w-full h-48 object-cover" />
                <div className="p-2 md:p-4">
                    <h2 className="text-lg md:text-xl font-semibold">{story?.storyTitle}</h2>
                    <p className="text-gray-600">{story?.storyDescription?.slice(0, 100)}...</p>
                    <div className="flex justify-between">
                        <p className="text-[17px] font-semibold">{story?.author?.name}</p>
                        <p className="text-[17px] font-semibold">{story?.postDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

StoryCard.propTypes = {
    story: PropTypes.object
}

export default StoryCard;