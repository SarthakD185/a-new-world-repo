import { Swiper, SwiperSlide } from 'swiper/react';
import { React } from 'react';
import galleryData from '../../assets/data/gallery.json';
import '../../assets/css/IndividualCollege.css';
import '../../App.css';
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';

{/* https://swiperjs.com/demos */}
function GalleryList(props) {
    // Check if galleryData is loaded
    if (!galleryData) {
        return (
            <div className='fullHeight'>
                <p className='center'>Error: Unable to connect to the database.</p>
            </div>
        );
    }

    // Check if the college exists
    const collegeExists = galleryData.some(el => el.collegeID == props.collegeID);
    if (!collegeExists) {
        return (
            <div className='fullHeight'>
                <p className='center'>Error: College not found.</p>
            </div>
        );
    }

    // Create a new array by filtering the original array
    const filteredData = galleryData.filter((el) => el.collegeID == props.collegeID);

    if (filteredData.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Images to Display for the selected college.</p>
            </div>
        );
    } else {
        return (
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className='swiper'
            >
                {filteredData.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiperDiv">
                            <img src={image.src} className='rounded' alt={`Image ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }
}

export default GalleryList;
