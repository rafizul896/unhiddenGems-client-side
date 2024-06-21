import { Helmet } from "react-helmet";
import Loader from "../../../components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import AssignedDataRow from "../../../components/Dashboard/TableRows/AssignedDataRow";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";


const MyAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // pagination
  const [count, setCount] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value)
  }

  const { data: assignedTours = [], refetch, isLoading } = useQuery({
    queryKey: ['assignedTours',itemsPerPage,currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/assigned-tours/${user?.displayName}?page=${currentPage}&size=${itemsPerPage}`);
      return data;
    }
  })

  // count total
  useQuery({
    queryKey: ['assignedToursTotal'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/assigned-tours-total/${user?.displayName}`);
      return setCount(parseInt(data.count));
    }
  })
  const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)

  if (isLoading || loading) return <Loader />

  return (
    <>
      <Helmet>
        <title>My Assigned Tours</title>
      </Helmet>

      <div>
        <SectionTitle heading={'My Assigned Tours'} />
        <div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Package_Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Tourist_Name
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
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {
                    assignedTours.map(tour => <AssignedDataRow key={tour._id} tour={tour} refetch={refetch} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination count={count} handlePaginationButton={handlePaginationButton} currentPage={currentPage} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} pages={pages} />
      </div>
    </>
  )
}

export default MyAssignedTours;