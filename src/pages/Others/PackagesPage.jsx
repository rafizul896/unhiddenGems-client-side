import { useParams, Link } from 'react-router-dom';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Shared/Loader';

const PackagesPage = () => {
    const { type } = useParams();
    console.log(type)

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/packages?type=${type}`)
            return data;
        }
    })

    if (isLoading) return <Loader />

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{type} Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages?.map((pkg) => (
                     <div key={pkg._id} className="border rounded-lg overflow-hidden shadow-lg">
                     <div className='relative'>
                         <img src={pkg?.images[0]} className="w-ful h-48 object-cover" />
                     </div>
                     <div className="p-2">
                         <div className="flex justify-between items-center">
                             <h3 className="text-lg font-bold">{pkg?.tripTitle}</h3>
                             {/* <button className="text-red-500">❤️</button> */}
                         </div>
                         <p>Tour Type: {pkg?.tourType}</p>
                         <p>Price: {pkg?.price}</p>
                         <Link to={`/packageDetails/${pkg?._id}`}>
                             <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View Package</button>
                         </Link>
                     </div>
                 </div>
                ))}
            </div>
        </div>
    );
};

export default PackagesPage;