import { Helmet } from "react-helmet";
import Loader from "../../../components/Shared/Loader";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AddAGuide from "../TourGuide/AddAGuide";
import AddAStory from "../Tourist/AddAStory";


const Profile = () => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || isLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-10 justify-center items-center min-h-[90vh]'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl md:w-3/5'>
                <img
                    alt='profile'
                    src='https://i.ibb.co/1z06d9T/istockphoto-1130072587-612x612.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs text-white bg-green-500 rounded-full'>
                        {role.split('')[0].toUpperCase() + role.slice(1)}
                    </p>
                    <p className='mt-2 text-sm md:text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div className="flex flex-col justify-center items-center mt-3">
                                <button className='bg-[#00aa6c] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#008768] block mb-1'>
                                    Update Profile
                                </button>
                                <button className='bg-[#00aa6c] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#008768]'>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                role === 'Tour Guide' && <AddAGuide />
            }
            {
                role === 'Tourist' && <AddAStory />
            }
        </div>
    )
}

export default Profile;