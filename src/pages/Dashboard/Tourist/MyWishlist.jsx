import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Shared/Loader";
import { Helmet } from "react-helmet";
import WishlistDataRow from "../../../components/Dashboard/TableRows/WishlistDataRow";

const MyWishlist = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth();
    console.log(user)

    const { data: wishlist = [], refetch, isLoading } = useQuery({
        queryKey: ['my-wishlist'],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user?.email}`);
            return data;
        }
    })

    console.log(wishlist)

    if (isLoading || loading) return <Loader />

    return (
        <>
            <Helmet>
                <title>My Wishlist</title>
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
                                            Package Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Tour Type
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal flex justify-center'
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table Row Data */}
                                    {
                                        wishlist.map(wish => <WishlistDataRow key={wish._id} wish={wish} refetch={refetch} />)
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

export default MyWishlist;