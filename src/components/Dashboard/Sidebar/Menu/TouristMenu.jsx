import MenuItem from './MenuItem'
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiContactsBook3Fill } from 'react-icons/ri';
import useRole from '../../../../hooks/useRole';
import { FaUserTag } from 'react-icons/fa';
import TourGuideModal from '../../../Modal/TourGuideModal';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const TouristMenu = () => {
    const axiosSecure = useAxiosSecure()
    const { role } = useRole();
    const { user } = useAuth();
    // for modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const { mutateAsync } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, user);
            return data;
        },
        onSuccess: async (data) => {
            if(data. modifiedCount>0){
                toast.success('Successful')
            }
            else{
                toast.warning('Please wait for Admin Approved')
            }
            console.log(data)
        }
    })

    const modalHandler = async () => {
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            role: "Tourist",
            status: 'Requested'
        }
        console.log('click this')
        await mutateAsync(currentUser)
        closeModal()
    }

    return (
        <>
            <MenuItem icon={RiContactsBook3Fill} label='My Bookings' address='my-bookings' />
            <MenuItem icon={BsFillBookmarkHeartFill} label='My Wishlist' address='my-wishlist' />

            {
                role === 'Tourist' &&

                <div onClick={() => setIsModalOpen(!isModalOpen)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
                    <FaUserTag className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Become A TourGuide</span>
                    <TourGuideModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler} />
                </div>
            }
        </>
    );
};

export default TouristMenu;