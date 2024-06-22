import { useMutation } from "@tanstack/react-query";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddAGuide = () => {
    const axiosSecure = useAxiosSecure();
    // use queary
    const { mutateAsync } = useMutation({
        mutationFn: async guide => {
            const { data } = await axiosSecure.post('/tourGuides', guide)
            return data
        },
        onSuccess: () => {
            Swal.fire({
                title: "Success!",
                // text: "Your story has been added",
                icon: "success",
                timer: 2000
            });
        },
        onError: (e) => {
            toast.error(e?.message)
        }
    })
    const handleGuideFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const profilePicture = form.profilePicture.value;
        const contactDetails = form.contactDetails.value;
        const education = form.education.value;
        const skills = form.skills.value;
        const workExperience = form.workExperience.value;
        const totalExperience = form.totalExperience.value;

        const guide = {
            name,
            profilePicture,
            contactDetails,
            education,
            skills,
            workExperience,
            totalExperience
        }

        await mutateAsync(guide)
    };

    return (
        <div className="w-full">
            <SectionTitle heading={'Add a Guide'} />
            <form onSubmit={handleGuideFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="profilePicture">Profile Picture</label>
                    <input
                        required
                        type="text"
                        name="profilePicture"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="contactDetails">Contact Details</label>
                    <input
                        required
                        type="text"
                        name="contactDetails"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="education">Education</label>
                    <input
                        required
                        type="text"
                        name="education"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="skills">Skills</label>
                    <input
                        required
                        type="text"
                        name="skills"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="workExperience">Work Experience</label>
                    <input
                        required
                        type="text"
                        name="workExperience"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="totalExperience">Total Experience</label>
                    <input
                        required
                        type="text"
                        name="totalExperience"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Guide
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AddAGuide;