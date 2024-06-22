import { Helmet } from "react-helmet";
import Loader from "../../../components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookingDataRow from "../../../components/Dashboard/TableRows/BookingDataRow";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import Confetti from 'react-confetti';
import { useWindowSize } from "react-use";
import { toast } from "react-toastify";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // pagination
  const [count, setCount] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  // discount
  const [showCongrats, setShowCongrats] = useState(false);
  const { width, height } = useWindowSize();

  // handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value)
  }

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ['my-booking', itemsPerPage, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booking/${user?.email}?page=${currentPage}&size=${itemsPerPage}`);
      return data;
    }
  })

  const totalBooking = bookings.filter(booking => booking.status === 'Accepted')
  useEffect(() => {
    if (totalBooking.length > 3) {
      setShowCongrats(true)
    }
  }, [totalBooking, showCongrats])

  const applyDiscount = () => {
    toast.success("Discount applied!");
    setShowCongrats(false)
  };

  // count total
  useQuery({
    queryKey: ['myBookingsTotal'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booking-total/${user.email}`);
      return setCount(parseInt(data.count));
    }
  })
  const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)

  if (isLoading || loading) return <Loader />

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>
      <div className=''>
        <SectionTitle heading={'My Bookings'} />
        {showCongrats &&
          <div className="p-4 border border-green-500 bg-green-100 rounded-lg flex flex-col justify-center items-center">
            <Confetti width={width} height={height} />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Congratulations!</h2>
            <p className="text-green-700 mb-4">You have booked more than 3 times. Youre eligible for a discount.</p>
            <button
              onClick={applyDiscount}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Apply Discount
            </button>
          </div>
        }
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Package Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Tour_Guide_Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Tour_Date
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Table Row Data */}
                {
                  bookings.map(booking => <BookingDataRow key={booking._id} booking={booking} refetch={refetch} />)
                }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination count={count} handlePaginationButton={handlePaginationButton} currentPage={currentPage} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} pages={pages} />
      </div>
    </>
  )
}

export default MyBookings;