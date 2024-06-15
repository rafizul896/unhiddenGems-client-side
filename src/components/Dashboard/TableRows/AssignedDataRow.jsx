import PropTypes from 'prop-types'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';


const AssignedDataRow = ({ tour, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/booking/status/${id}`, { status: 'Accepted' })
            return data;
        },
        onSuccess: async data => {
            console.log(data)
            toast.success('Success')
            refetch()
        }
    })

    const { mutateAsync: reject } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/booking/status/${id}`, { status: 'Rejected' })
            return data;
        },
        onSuccess: async data => {
            console.log(data)
            toast.success('Success')
            refetch()
        }
    })

    // Actions

    const handleAccept = async (id) => {
        await mutateAsync(id)
    }

    const handleReject = async (id) => {
        await reject(id)
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{tour?.packageName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{tour?.tourGuideName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{new Date(tour?.date).toLocaleDateString()}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${tour?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{tour?.status}</p>
            </td>
            {
                tour.status === 'In Review' ?
                    <td className="py-2 px-4 border-b">
                        <div className='flex'>
                            <button
                                onClick={() => handleAccept(tour._id)}
                                className={`bg-green-500 text-white px-4 py-2 rounded mr-2`}
                                disabled={tour.status !== 'In Review'}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(tour._id)}
                                className={`bg-red-500 text-white px-4 py-2 rounded`}
                                disabled={tour.status !== 'In Review'}
                            >
                                Reject
                            </button>
                        </div>
                    </td>
                    :
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <button className={`bg-green-500 text-white px-6 py-1.5 rounded-full ${tour.status !== 'In Review' && 'cursor-not-allowed'}`}>Done</button>
                    </td>
            }
        </tr>
    )
}

AssignedDataRow.propTypes = {
    tour: PropTypes.object,
    refetch: PropTypes.func,
}

export default AssignedDataRow;