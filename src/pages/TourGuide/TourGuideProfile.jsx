import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { useParams } from 'react-router-dom';
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

const TourGuideProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();

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
            toast.warning("You must be logged in to submit a review.");
            return;
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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-5 items-center space-x-4 border md:w-[80%] mx-auto">
                <img className="h-40" src={guide?.profilePicture} alt={`${guide?.name}`} />
                <div className='flex flex-col gap-1'>
                    <h1 className="text-2xl font-semibold">{guide?.name}</h1>
                    <p>{guide?.contactDetails.email}</p>
                    <p>{guide?.contactDetails.phone}</p>
                    <p>{guide?.contactDetails.address}</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Education</h2>
                <ul className="list-disc list-inside">
                    {guide?.education.map((edu, index) => (
                        <li key={index}>{edu.degree} from {edu.institution} ({edu.year})</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Skills</h2>
                <ul className="list-disc list-inside">
                    {guide?.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <SectionTitle heading={'Work Experience'} />
                <ul className="list-disc list-inside">
                    {guide?.workExperience.map((work, index) => (
                        <li key={index}>
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
                        <span className='font-semibold'>Comment:</span>
                        <textarea
                            required
                            name='comment'
                            className="mt-1 p-3 border rounded w-full"
                        ></textarea>
                    </label>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TourGuideProfile;
