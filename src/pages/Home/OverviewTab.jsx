import { Link } from "react-router-dom";

const OverviewTab = () => {
    return (
        <div className="rounded-lg pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="flex flex-col items-center border p-2">
                    <img
                        src="https://i.ibb.co/3M60w5W/tour-Guides1.jpg"
                        alt="Tour Guide"
                        className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">Experienced Tour Guides</h2>
                    <p className="text-center">Our team of experienced tour guides will ensure you have a memorable and informative journey. They are experts in their fields, providing insights and stories that bring destinations to life.</p>
                </div>

                <div className="flex flex-col items-center border p-2">
                    <img
                        src="https://i.ibb.co/1bFV9PL/Dhaka-City-Tour.jpg"
                        alt="Destinations"
                        className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">Exciting Destinations</h2>
                    <p className="text-center">Explore a wide range of exciting destinations with us. From cultural heritage sites to breathtaking natural wonders, we offer tours that cater to all interests and preferences.</p>
                </div>

                <div className="flex flex-col items-center border p-2">
                    <img
                        src="https://i.ibb.co/jrgnn6d/Customizable-Packages.webp"
                        alt="Customizable Packages"
                        className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">Customizable Packages</h2>
                    <p className="text-center">We offer customizable tour packages to suit your needs and preferences. Whether you are looking for adventure, relaxation, or cultural exploration, we have something for everyone.</p>
                </div>

                <div className="flex flex-col items-center border p-2">
                    <img
                        src="https://i.ibb.co/gMCXhjK/Customer-Satisfaction.png"
                        alt="Customer Satisfaction"
                        className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">Customer Satisfaction</h2>
                    <p className="text-center">Our top priority is customer satisfaction. We strive to provide the best possible experience for our clients, ensuring every tour is enjoyable and stress-free.</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link to='/aboutUs'>
                    <button
                        className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg hover:bg-indigo-600 transition duration-300"
                    >
                        Learn More About Our Tours
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OverviewTab;
