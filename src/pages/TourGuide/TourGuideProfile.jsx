import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Shared/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionTitle from '../../components/Shared/SectionTitle';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { GiCheckMark } from 'react-icons/gi';
import { TfiEmail } from "react-icons/tfi";
import { IoIosCall } from 'react-icons/io';
import { FaRegAddressCard } from 'react-icons/fa';
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";

const TourGuideProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate('')

    const { data: guide, isLoading } = useQuery({
        queryKey: ['guide'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/tourGuides/${id}`);
            return data;
        }
    })
    // add a rating
    const { mutateAsync } = useMutation({
        mutationFn: async review => {
            const { data } = await axiosSecure.patch(`/addReview/${id}`, review);
            return data;
        },
        onSuccess: (e) => {
            if (e.message === 'exist') {
                toast.warning('Already added a Review..!')
            }
            else {
                toast.success('Review Added Success')
            }
        },
        onError: e => {
            console.log(e.message);
            toast.error(e.message)
        }
    })

    const handleSubmitReview = async e => {
        e.preventDefault();
        const comment = e.target.comment.value
        if (!user) {
            return (
                toast.warning("You must be logged in to submit a review."),
                navigate('/login')
            )
        }

        const newReview = {
            userName: user?.displayName,
            rating,
            comment,
            date: new Date().toISOString().split('T')[0]
        };

        await mutateAsync(newReview)
    };

    if (isLoading) return <Loader />

    return (
        <div className="max-w-4xl mx-auto  bg-white rounded-lg mb-10">
            <div className="flex flex-col md:flex-row gap-5 items-center bg-green-100 py-4">
                <img className="h-40" src={guide?.profilePicture} alt={`${guide?.name}`} />
                <div className='flex flex-col gap-1'>
                    <h1 className="text-2xl font-semibold text-center md:text-start">{guide?.name}</h1>
                    <p className='flex items-center gap-1 font-medium'><TfiEmail /> {guide?.contactDetails.email}</p>
                    <p className='flex items-center gap-1 font-medium'><IoIosCall /> {guide?.contactDetails.phone}</p>
                    <p className='flex items-center gap-1 font-medium'><FaRegAddressCard /> {guide?.contactDetails.address}</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Education</h2>
                <ul className="">
                    {guide?.education.map((edu, index) => (
                        <li className='flex items-center gap-1' key={index}><GiCheckMark /> {edu.degree} from {edu.institution} ({edu.year})</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Skills</h2>
                <ul className="">
                    {guide?.skills.map((skill, index) => (
                        <li className='flex items-center gap-1' key={index}><GiCheckMark /> {skill}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <SectionTitle heading={'Work Experience'} />
                <ul>
                    {guide?.workExperience.map((work, index) => (
                        <li className='flex items-start gap-1' key={index}>
                            <span className="text-2xl">
                                <VscDebugBreakpointLogUnverified />
                            </span>
                            {work.role} at {work.company} ({work.duration}) - {work.responsibilities.join(', ')}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <SectionTitle heading={'Reviews'} />
                <Swiper
                    navigation={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    modules={[Navigation, Autoplay, Pagination]}
                    className="mySwiper">
                    {
                        guide?.reviews?.map((review, indx) => <SwiperSlide key={indx}>
                            <div className="px-4 md:px-10 flex flex-col justify-center items-center text-center space-y-3">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="px-5">{review.comment}</p>
                                <h1 className="text-2xl text-[#CD9003]">{review.userName}</h1>

                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            {/* add review */}
            <div className="mt-6">
                <SectionTitle heading={'Add a Review'} />
                <form onSubmit={handleSubmitReview}>
                    <div className="mt-4 flex justify-center">
                        <Rating style={{ maxWidth: 200 }} isRequired value={rating} onChange={setRating} />
                    </div>
                    <label className="block mt-4">
                        <span className='block text-gray-700 text-lg font-medium mb-2'>Comment:</span>
                        <textarea
                            required
                            name='comment'
                            className="mt-1 p-3 border rounded w-full"
                        ></textarea>
                    </label>
                    <button className="mt-4 px-4 py-2 bg-[#00aa6c] hover:bg-[#008768] text-white rounded hover:bg-blue-600">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TourGuideProfile;
