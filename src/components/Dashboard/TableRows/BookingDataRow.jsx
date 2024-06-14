import PropTypes from 'prop-types'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from 'sweetalert2';


const BookingDataRow = ({ booking, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/booking/${id}`)
            return data;
        },
        onSuccess: async data => {
            console.log(data)
            refetch()
        }
    })

    // Actions
    const handlePay = (bookingId) => {
        // Implement payment logic here
        console.log(`Paying for booking: ${bookingId}`);
    };

    const handleCancel = (bookingId) => {
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
                await mutateAsync(bookingId)
                Swal.fire({
                    title: "Cancel!",
                    text: "Your booking has been cancel.",
                    icon: "success"
                });
            }
        });
        // Implement cancel logic here
        console.log(`Cancelling booking: ${bookingId}`);
    };

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{booking?.packageName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{booking?.tourGuideName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{new Date(booking?.date).toLocaleDateString()}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{booking?.status}</p>
            </td>

            <td className="py-2 px-4 border-b">
                {booking.status === 'In Review' && (
                    <button
                        onClick={() => handleCancel(booking._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                    >
                        Cancel
                    </button>
                )}
                {booking.status === 'Accepted' && (
                    <button
                        onClick={() => handlePay(booking.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                        Pay
                    </button>
                )}
            </td>
        </tr>
    )
}

BookingDataRow.propTypes = {
    booking: PropTypes.object,
    refetch: PropTypes.func,
}

export default BookingDataRow