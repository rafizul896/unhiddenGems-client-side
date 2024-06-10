import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Shared/Loader';
import { SlLocationPin } from 'react-icons/sl';
import useTourGuides from '../../hooks/useTourGuides';

const PackageDetailsPage = () => {
    const { tourGuides } = useTourGuides();
    const { id } = useParams();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState('');

    const { data: packageDetails, isLoading } = useQuery({
        queryKey: ['packageDetails?'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/packages/${id}`);
            return data;
        }
    })

    console.log(packageDetails)

    const handleBooking = () => {
        if (!user) {
            alert("You need to be logged in to book a package.");
            return;
        }
        alert("Confirm your Booking");
    };

    if (isLoading) return <Loader />

    return (
        <div className="container mx-auto py-8">
            {/* Gallery Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packageDetails?.images.map((image, index) => (
                        <img key={index} src={image} alt={`Place ${index + 1}`} className="w-full h-48 object-cover rounded" />
                    ))}
                </div>
            </div>

            {/* About The Tour Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About The Tour</h2>
                <p>{packageDetails?.aboutTour}</p>
            </div>

            {/* Tour Plan Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
                <div>
                    {
                        packageDetails?.tourPlan.map((plan, indx) => <div key={plan._id} className="collapse collapse-arrow bg-blue-50 mt-3">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title md:text-xl font-medium flex gap-4">
                                <div className='text-sm md:text-lg flex items-center gap-1 bg-[#22e6b5] px-2 md:px-4 py-1 rounded-sm font-semibold'>
                                    <SlLocationPin /> <span>Day {indx + 1}</span>
                                </div>
                                {plan.title}
                            </div>
                            <div className="collapse-content">
                                <p>{plan.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            {/* Tour Guides Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tour Guides</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tourGuides.map((guide) => (
                        <div key={guide.id} className="border rounded-lg overflow-hidden shadow-lg">
                            <img src={guide.profilePicture} alt={guide.name} className="w-full h-52 object-cover" />
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold">{guide.name}</h3>
                                <Link to={`/tourGuideProfile/${guide._id}`}>
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Form Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Name of the package</label>
                            <input type="text" value={packageDetails?.name} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Tourist Name</label>
                            <input type="text" value={user?.name || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Tourist Email</label>
                            <input type="email" value={user?.email || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Tourist Image URL</label>
                            <input type="text" value={user?.image || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Price</label>
                            <input type="text" value={packageDetails?.price} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Tour Date</label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Tour Guide Name</label>
                            <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} className="border p-2 w-full rounded">
                                {tourGuides.map((guide) => (
                                    <option key={guide.id} value={guide.name}>{guide.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
