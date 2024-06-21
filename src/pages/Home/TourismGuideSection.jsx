import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useTourGuides from '../../hooks/useTourGuides';
import PackageCard from '../../components/card/PackageCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';

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

                <TabPanel>
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Overview</h2>
                        <p>Here you can add videos or any relevant content to provide an overview of the tourism options.</p>
                        {/* Add video or other content here */}
                    </div>
                </TabPanel>
                {/* Our Packages */}
                <TabPanel>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                packages.map(item => <PackageCard key={item._id} item={item} />)
                            }
                        </div>
                        <Link to='/allPackages' className='flex justify-center items-center'><button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">All Packages</button></Link>
                    </div>
                </TabPanel>
                {/* Meet Our Tour Guides */}
                <TabPanel>
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Meet Our Tour Guides</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                tourGuides.map(guide => <div key={guide._id} className="border rounded-lg overflow-hidden shadow-lg">
                                    <img src={guide.profilePicture} alt="Guide 1" className="w-full h-48 object-cover" />
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{guide.name}</h3>
                                            <p>Experience: {guide.totalExperience}</p>
                                        </div>
                                        <Link to={`/tourGuideProfile/${guide._id}`}>
                                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Details</button>
                                        </Link>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismGuideSection;
