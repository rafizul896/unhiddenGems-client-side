import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types'; // ES6
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { Link } from "react-router-dom";
import useAxiosCommon from '../../hooks/useAxiosCommon';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const PackageCard = ({ item }) => {
    const { images, price, tripTitle, tourType } = item;
    const [love, setLove] = useState(false);
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async wishData => {
            const { data } = await axiosCommon.post('/wishlist', wishData);
            return data
        },
        onError: e => {
            console.log(e.message)
        },
        onSuccess: (e) => {
            setLove(true);
            if (e.message === 'exist') {
                toast.warning('Already added')
            }
            else {
                toast.success('Wishlist add success')
            }
        }
    })

    const handleWishlist = async (wish) => {
        const wishPackage = {
            ...wish,
            packageId: wish._id,
            tourist: {
                email: user?.email
            }
        }
        delete wishPackage._id;
        console.log(wishPackage);
        if (!user) {
            return toast.warning('Please Login first')
        }
        await mutateAsync(wishPackage);

    }

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <div className='relative'>
                <img src={images[0]} className="w-ful h-48 object-cover" />
                <div onClick={() => handleWishlist(item)} className='text-2xl cursor-pointer absolute top-2 right-2 bg-white p-1.5 rounded-full'>
                    {
                        love ?
                            <IoMdHeart className='text-red-500' /> :
                            <IoMdHeartEmpty />
                    }
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{tripTitle}</h3>
                    {/* <button className="text-red-500">❤️</button> */}
                </div>
                <p>Tour Type: {tourType}</p>
                <p>Price: {price}</p>
                <Link to={`/packageDetails/${item._id}`}>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View Package</button>
                </Link>
            </div>
        </div>
    );
};

PackageCard.propTypes = {
    item: PropTypes.object
}

export default PackageCard;