import { useParams, Link } from 'react-router-dom';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Shared/Loader';

const PackagesPage = () => {
    const { type } = useParams();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packagesType'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/packages?type=${type}`)
            return data;
        }
    })

    if (isLoading) return <Loader />
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{type} Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages?.map((pkg) => (
                    <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                            <img src={pkg.images[0]} alt={pkg.tripTitle} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{pkg.tripTitle}</h2>
                                <p className="text-gray-600 mt-2">{pkg.aboutTour.substring(0, 100)}...</p>
                                <div className="flex flex-row-reverse justify-between">
                                    <div className="mt-2">
                                        <span className="text-gray-800 font-medium">Price: </span>
                                        <span className="text-gray-800">{pkg.price}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-gray-800 font-medium">Tour Type: </span>
                                        <span className="text-gray-800">{pkg.tourType}</span>
                                    </div>
                                </div>
                                <Link to={`/packageDetails/${pkg._id}`}>
                                    <button className="mt-2 px-4 py-2 w-full rounded-full bg-[#00aa6c] hover:bg-[#008768] text-white">View Package</button>
                                </Link>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default PackagesPage;