import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useTourGuides from '../../hooks/useTourGuides';
import PackageCard from '../../components/card/PackageCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import OverviewTab from './OverviewTab';

const TourismGuideSection = () => {
    const { tourGuides } = useTourGuides();

    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/packages?size=${6}`)
            return data;
        }
    })

    return (
        <div className="container mx-auto">
            <Tabs>
                <TabList className="flex border-b justify-center items-center">
                    <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500">
                        Overview
                    </Tab>
                    <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500">
                        Our Packages
                    </Tab>
                    <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500">
                        Meet Our Tour Guides
                    </Tab>
                </TabList>
                {/* Overview */}
                <TabPanel>
                    <div className='mt-5'>
                        <OverviewTab />
                    </div>
                </TabPanel>
                {/* Our Packages */}
                <TabPanel>
                    <div className='mt-5'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {
                                packages.map(item => <PackageCard key={item._id} item={item} />)
                            }
                        </div>
                        <Link to='/allPackages' className='flex justify-center items-center'><button className="mt-4 px-4 py-2 bg-green-500 hover:bg-[#00aa6c] text-white rounded">All Packages</button></Link>
                    </div>
                </TabPanel>
                {/* Meet Our Tour Guides */}
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                        {
                            tourGuides.map(guide => <div key={guide._id} className="border rounded-lg overflow-hidden shadow-lg">
                                <img src={guide.profilePicture} alt="Guide 1" className="w-full h-48 object-cover" />
                                <div className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold">{guide.name}</h3>
                                        <p><span className='font-semibold'>Experience:</span> {guide.totalExperience}</p>
                                    </div>
                                    <Link to={`/tourGuideProfile/${guide._id}`}>
                                        <button className="mt-2 px-4 py-2 bg-[#00aa6c] hover:bg-[#008768] text-white rounded">Details</button>
                                    </Link>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismGuideSection;
