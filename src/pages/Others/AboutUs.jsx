import { Helmet } from "react-helmet";
import { GiCheckMark } from "react-icons/gi";

const AboutUs = () => {
    return (
        <div className="text-gray-900 pb-5">
            <Helmet>
                <title>About Us || Unhidden Gems</title>
            </Helmet>
            <section className="mt-5">
                <p className="text-lg mt-5">
                    <span className="font-bold">About Us : </span>
                    Welcome to Adventure Travel Co., where we turn your travel dreams into reality. Our mission is to provide unforgettable travel experiences by offering high-quality, personalized services.
                </p>
            </section>

            <section className="mt-5">
                <p>
                    <span className="font-bold">Our Mission : </span>
                    Our mission is to inspire people to explore the world and experience new cultures. We strive to offer the best travel packages and services that cater to the unique needs and interests of our clients.
                </p>
            </section>

            <section className="mt-5">
                <ul>
                    <span className="font-bold">Our Values : </span>
                    <li className="flex items-center gap-1"><GiCheckMark /> Customer Satisfaction</li>
                    <li className="flex items-center gap-1"><GiCheckMark /> Integrity and Honesty</li>
                    <li className="flex items-center gap-1"><GiCheckMark /> Innovation and Creativity</li>
                    <li className="flex items-center gap-1"><GiCheckMark /> Environmental Responsibility</li>
                    <li className="flex items-center gap-1"><GiCheckMark /> Cultural Respect and Understanding</li>
                </ul>
            </section>

            <section className="mt-5">
                <p>
                    <span className="font-bold">Our History : </span>
                    Founded in 2010, Adventure Travel Co. has grown from a small startup to a leading travel company. Over the years, we have helped thousands of travelers discover new destinations and create lasting memories.
                </p>
            </section>
            <section className="mt-5 border p-4 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-center gap-5">
                    <div className="md:h-[100px] md:w-[300px]">
                        <img className="rounded-full object-cover" src="https://i.ibb.co/LNNP0Sg/Firefly-20240503143342.png" alt="" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg">Rafizul Islam</h1>
                        <p>
                            Rafizul Islam, our visionary CEO and Founder, has been the driving force behind Adventure Travel Co. since its inception in 2010. With over 20 years of experience in the travel industry, John is passionate about creating unique and memorable travel experiences for our clients. Under his leadership, the company has grown from a small startup to a leading travel agency. Rafizul dedication to excellence and innovation ensures that Adventure Travel Co. continues to inspire travelers worldwide.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;