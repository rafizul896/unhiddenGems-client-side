import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Shared/Loader";
import { Helmet } from "react-helmet";
import WishlistDataRow from "../../../components/Dashboard/TableRows/WishlistDataRow";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Pagination from "../../../components/Pagination/Pagination";
import { useState } from "react";

const MyWishlist = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth();
    // pagination
    const [count, setCount] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    // handle pagination button
    const handlePaginationButton = (value) => {
        setCurrentPage(value)
    }

    const { data: wishlist = [], refetch, isLoading } = useQuery({
        queryKey: ['my-wishlist', currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user?.email}?page=${currentPage}&size=${itemsPerPage}`);
            return data;
        }
    })

    // count total
    useQuery({
        queryKey: ['myWishlistTotal'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist-total/${user.email}`);
            return setCount(parseInt(data.count));
        }
    })
    const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1);

    if (isLoading || loading) return <Loader />
    return (
        <>
            <Helmet>
                <title>My Wishlist</title>
            </Helmet>

            <div>
                <SectionTitle heading={'My Wishlisst'} />
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
                <Pagination count={count} handlePaginationButton={handlePaginationButton} currentPage={currentPage} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} pages={pages} />
            </div>
        </>
    )
}

export default MyWishlist;