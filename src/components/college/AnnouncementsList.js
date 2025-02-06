import { React } from 'react';
import announcements from '../../assets/data/announcements.json';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualCollege.css';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function AnnouncementsList(props) {

    //create a new array by filtering the original array

    const filteredAnnouncements = announcements.filter((el) => {

        if(el.collegeID == props.collegeID) {

            return el;

        }

    })

    if(filteredAnnouncements.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Announcements to Display</p>
            </div>
        )

    } else {

        return (

            <div>
                        {/* https://flowbite-react.com/docs/typography/hr */}
                        <HR />
                        
                        {filteredAnnouncements.map((announcement) => (
                            <div key={announcement.id}>
                                <div>
                                    <div class='horizontalFlex spaceBetween'>
                                        <h4 class='noMargin'>{announcement.title}</h4>
                                        <p id='postDate'>{announcement.postDate}</p>
                                    </div>
                                    <p class='shortBio'>{announcement.content}</p>
                                </div>
                                <HR />
                            </div>
                        ))}
                    </div>

        )
    }

}



export default AnnouncementsList;