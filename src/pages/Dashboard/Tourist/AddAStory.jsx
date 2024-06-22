import { useMutation } from "@tanstack/react-query";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddAStory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // use queary
    const { mutateAsync } = useMutation({
        mutationFn: async story => {
            const { data } = await axiosSecure.post('/stories', story)
            return data
        },
        onSuccess: () => {
            Swal.fire({
                title: "Success!",
                text: "Your story has been added",
                icon: "success",
                timer: 2000
            });
        },
        onError: (e) => {
            toast.error(e?.message)
        }
    })

    const handleAddStory = async (e) => {
        e.preventDefault();
        const form = e.target;
        const storyTitle = form.storyTitle.value;
        const storyDescription = form.storyDescription.value;
        const storyImage = form.storyImage.value;
        const postDate = new Date().toLocaleDateString();

        const story = {
            author: {
                name: user?.displayName,
                img: user?.photoURL,
                email: user?.email
            },
            postDate,
            storyTitle,
            storyDescription,
            storyImage
        }

        console.log(story)
        await mutateAsync(story)
    };

    return (
        <div className="add-story-section mt-6 border w-full">
            <SectionTitle heading={'Add a Story'} />
            {/* <h3 className="text-xl font-semibold mb-4">Add a Story</h3> */}
            <form onSubmit={handleAddStory} className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2">Story Title</label>
                    <input
                        name="storyTitle"
                        type="text"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2">Story Description</label>
                    <textarea
                        name="storyDescription"
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2">Story Image URL</label>
                    <input
                        type="text"
                        name="storyImage"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">
                        Add Story
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAStory;