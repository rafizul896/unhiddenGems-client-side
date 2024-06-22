import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Shared/Loader';
import { SlLocationPin } from 'react-icons/sl';
import useTourGuides from '../../hooks/useTourGuides';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PackageDetailsPage = () => {
    const { tourGuides } = useTourGuides();
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [date, setDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState('');
    const navigate = useNavigate();

    const { data: packageDetails, isLoading } = useQuery({
        queryKey: ['packageDetails?'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/packages/${id}`);
            return data;
        }
    })
    // post booking
    const { mutateAsync } = useMutation({
        mutationFn: async (book) => {
            const { data } = await axiosSecure.post('/bookings', book);
            return data;
        },
        onSuccess: (e) => {
            if (e.message === 'exist') {
                toast.warning('You have to already booking the package')
            }
            else {
                Swal.fire({
                    title: "Booking Success!",
                    icon: "success"
                });
            }
        },
        onError: e => {
            console.log(e.message);
            toast.error(e.message)
        }
    })

    const handleBooking = async (e) => {
        e.preventDefault();
        const form = e.target;
        const packageName = form.packageName.value;
        const touristName = form.touristName.value;
        const touristEmail = form.touristEmail.value;
        const touristImage = form.touristImage.value;
        const tourGuideName = form.tourGuideName.value
        const price = form.price.value;

        const bookingInfo = {
            packageName,
            tourGuideName,
            touristInfo: {
                touristName,
                touristEmail,
                touristImage
            },
            price,
            date,
            status: "In Review",
            packageId: id
        }

        if (!user) {
            return (
                toast.error("You need to be logged in to book a package."),
                navigate('/login')
                // <Navigate state={location?.pathname} to={'/login'} />
            )
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirm your Booking",
            denyButtonText: `My Bookings`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsync(bookingInfo);
            } else if (result.isDenied) {
                navigate('/dashboard/my-bookingS')
            }
        });
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
                        packageDetails?.tourPlan.map((plan, indx) => <div key={indx} className="collapse collapse-arrow bg-blue-50 mt-3">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title md:text-xl font-medium flex gap-4">
                                <div className='text-sm md:text-lg flex items-center gap-1 bg-[#00aa6c] px-2 md:px-4 py-1 rounded-sm font-semibold'>
                                    <SlLocationPin /> <span>Day {indx + 1}</span>
                                </div>
                                {plan.title}
                            </div>
                            <div className="collapse-content">
                                <p>{plan.description}</p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>

            {/* Tour Guides Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tour Guides</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {tourGuides.map((guide, indx) => (
                        <div key={indx} className="border rounded-lg overflow-hidden shadow-lg">
                            <img src={guide.profilePicture} alt={guide.name} className="w-full h-52 object-cover" />
                            <div className="p-3 flex justify-between items-center">
                                <h3 className="text-xl font-bold">{guide.name}</h3>
                                <Link to={`/tourGuideProfile/${guide._id}`}>
                                    <button
                                        className="mt-2 px-4 py-2 bg-[#00aa6c] hover:bg-[#008768] text-white rounded"
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
                <form onSubmit={handleBooking}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Name of the package</label>
                            <input name='packageName' type="text" value={packageDetails?.tripTitle} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Tourist Name</label>
                            <input name='touristName' type="text" value={user?.displayName || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Tourist Email</label>
                            <input name='touristEmail' type="email" value={user?.email || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Tourist Image URL</label>
                            <input name='touristImage' type="text" value={user?.photoURL || ''} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Price</label>
                            <input name='price' type="text" value={packageDetails?.price} readOnly className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Tour Date</label>
                            <DatePicker selected={date} onChange={(d) => setDate(d)} className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Tour Guide Name</label>
                            <select name='tourGuideName' value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} className="border p-2 w-full rounded">
                                {tourGuides.map((guide, indx) => (
                                    <option key={indx} value={guide.name}>{guide.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-end lg:justify-start'>
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
