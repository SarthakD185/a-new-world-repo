import { Swiper, SwiperSlide } from 'swiper/react';
import { React } from 'react';
import galleryData from '../../assets/data/gallery.json';
import '../../assets/css/IndividualCollege.css';
import '../../App.css';
import "swiper/css";

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function GalleryList(props) {

    //create a new array by filtering the original array

    const filteredData = galleryData.filter((el) => {

        if(el.collegeID == props.collegeID) {

            return el;

        }

    })

    if(filteredData.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Images to Display</p>
            </div>
        )

    } else {

        return (

            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className='mySwiper'
            >

                {filteredData.map((image) => (
                    <SwiperSlide>
                        <div class="swiperDiv">
                            <img src={image.src} class='rounded'></img>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

        )
    }

}



export default GalleryList;
