import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualCollege.css';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function AnnouncementsList({ collegeID }) {

    const [announcements, setAnnouncements] = useState([]);

    //fetch collegeID and filename for user's college
    useEffect(() => {
        const getAnnouncements = async () => {
            if(collegeID){
                try {
                    const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getCollegeAnnouncements?collegeID=${collegeID}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    // Log the raw response for debugging
                    console.log("API Response:", response);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
            
                    // Directly parse the response as JSON
                    const data = await response.json();
                    
                    // Assuming the data is an array and we want the first user in that array
                    if (data) {
                        setAnnouncements(data);  
                    } else {
                        console.error("No announcements found.");
                    }
                } catch (error) {
                    console.error("Error fetching announcements:", error);
                }
            }
        };
        getAnnouncements();
    }, [collegeID]);

    if(announcements.length === 0){

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
                        
                        {announcements.map((announcement) => (
                            <div key={announcement.announcementID}>
                                <div>
                                    <div class='horizontalFlex spaceBetween'>
                                        <h4 class='noMargin'>{announcement.title}</h4>
                                        <p id='postDate'>{announcement.POST_DATE}</p>
                                    </div>
                                    <p class='shortBio'>{announcement.CONTENT}</p>
                                </div>
                                <HR />
                            </div>
                        ))}
                    </div>

        )
    }

}



export default AnnouncementsList;