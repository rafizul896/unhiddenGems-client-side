import { Helmet } from "react-helmet";
import Loader from "../../../components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import AssignedDataRow from "../../../components/Dashboard/TableRows/AssignedDataRow";


const MyAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: assignedTours = [], refetch, isLoading } = useQuery({
    queryKey: ['assignedTours'],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/assigned-tours/${user?.displayName}`);
      return data;
    }
  })

  if (isLoading || loading) return <Loader />

  return (
    <>
      <Helmet>
        <title>My Assigned Tours</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
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
      </div>
    </>
  )
}

export default MyAssignedTours;