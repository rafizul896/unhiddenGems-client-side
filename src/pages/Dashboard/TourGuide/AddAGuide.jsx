import { useState } from "react";

const AddAGuide = () => {
    const [guides, setGuides] = useState([]);
    const [guideForm, setGuideForm] = useState({
        name: '',
        profilePicture: '',
        contactDetails: '',
        education: '',
        skills: '',
        workExperience: '',
        totalExperience: ''
    });
    const handleGuideFormChange = (e) => {
        const { name, value } = e.target;
        setGuideForm({ ...guideForm, [name]: value });
    };
    const handleGuideFormSubmit = (e) => {
        e.preventDefault();
        setGuides([...guides, { ...guideForm, id: guides.length + 1 }]);
        setGuideForm({
            name: '',
            profilePicture: '',
            contactDetails: '',
            education: '',
            skills: '',
            workExperience: '',
            totalExperience: ''
        });
    };
    return (
        <div>
            <form onSubmit={handleGuideFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={guideForm.name}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">Profile Picture</label>
                    <input
                        type="text"
                        name="profilePicture"
                        value={guideForm.profilePicture}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactDetails">Contact Details</label>
                    <input
                        type="text"
                        name="contactDetails"
                        value={guideForm.contactDetails}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">Education</label>
                    <input
                        type="text"
                        name="education"
                        value={guideForm.education}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={guideForm.skills}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workExperience">Work Experience</label>
                    <input
                        type="text"
                        name="workExperience"
                        value={guideForm.workExperience}
                        onChange={handleGuideFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalExperience">Total Experience</label>
                    <input
                        type="text"
                        name="totalExperience"
                        value={guideForm.totalExperience}
                        onChange={handleGuideFormChange}
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