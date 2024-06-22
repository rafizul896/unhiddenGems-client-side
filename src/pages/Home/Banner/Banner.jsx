// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const Banner = () => {
    const slides = [
        { image: 'https://i.ibb.co/R7LQZ85/banner.jpg' },
        { image: 'https://i.ibb.co/h8CgT23/How-to-Write-a-Tour-Guide-Script-Image-5.jpg' },
        { image: 'https://i.ibb.co/8mCVJpm/6e.jpg' }
    ];
    return (
        <div className='py-3 mx-auto'>
            <Swiper
                spaceBetween={30}
                loop={true}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper"
            >
                {
                    slides.map((slide, indx) =>
                    (<SwiperSlide key={indx}>
                        <div
                            className='w-full bg-center bg-cover h-[28rem] rounded-lg'
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            <div className='flex items-center justify-center w-full h-full bg-gray-900/50 rounded-lg'>
                                <div className='text-center space-y-3'>
                                    <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                        Do more with Unhidden Gems
                                    </h1>
                                    <p className='text-white w-[89%] mx-auto'>One site, 300,000+ travel experiences youll remember.</p>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                    )
                }
            </Swiper>
        </div>
    );
}

export default Banner;