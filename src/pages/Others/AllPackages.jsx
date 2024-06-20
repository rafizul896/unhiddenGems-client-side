import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../../components/Shared/Loader";
import usePackages from "../../hooks/usePackages";

const AllPackages = () => {
    const { packages, isLoading } = usePackages()

    if (isLoading) return <Loader />
    return (
        <div>
            <Helmet>
                <title>All Packages</title>
            </Helmet>
            <div>
                <section className='py-7'>
                    <div className='flex flex-col'>
                        <div className='-my-2 overflow-x-auto'>
                            <div className='inline-block min-w-full py-2 align-middle'>
                                <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-200'>
                                            <tr className="text-black ">
                                                <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right'>
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Trip Title</span>
                                                    </div>
                                                </th>

                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                                                    <span>Tour Type</span>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'
                                                >
                                                    <span>Price</span></th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'
                                                >
                                                    Details Button
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className='bg-white divide-y divide-gray-200 '>
                                            {
                                                packages.map(item => <tr key={item._id}>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.tripTitle}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.tourType}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.price}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                        <div className='inline-flex items-center px-4 py-1.5 rounded-full gap-x-2 bg-blue-500/20 text-[#0d2d5e]'>
                                                            <Link to={`/packageDetails/${item._id}`}>
                                                                <h2 className='text-sm font-normal'>View Details</h2>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AllPackages