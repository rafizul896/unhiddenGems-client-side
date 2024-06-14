import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const WishlistDataRow = ({ wish, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/wishlist/${id}`)
            return data;
        },
        onSuccess: async data => {
            console.log(data)
            refetch()
        }
    })
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsync(id)
                Swal.fire({
                    title: "Cancel!",
                    text: "Your wish package has been deleted.",
                    icon: "success"
                });
            }
        });
    };
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{wish?.tripTitle}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{wish?.tourType}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${wish?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center gap-5'>
                <span onClick={() => handleDelete(wish._id)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-300 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </span>
                {/* Delete modal */}
                <Link to={`/packageDetails/${wish?.packageId}`}>
                    <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-300 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Visit Details</span>
                    </span>
                </Link>
                {/* Update Modal */}
            </td>
        </tr>
    )
}

WishlistDataRow.propTypes = {
    wish: PropTypes.object,
    refetch: PropTypes.func,
}

export default WishlistDataRow