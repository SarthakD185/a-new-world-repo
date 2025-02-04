import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualCollege.css';
import { useLocation } from "react-router-dom";

function IndividualCollegePage() {

    const location = useLocation();
    const data = location.state;

    return (
    
        <div>

            <div class='horizontalFlex centerButton paddingTop'>
                <img src={require(`../../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1>{data.name}</h1>
            </div>

            <div class='extraWideColumnContainer'>
                    
                <div class='box' id='individualCollegeGallery'>
                    <h2>Gallery</h2>
                </div>

                <div class='box' id='individualCollegeRegisteredTeams'>
                    <h2>Registered Teams</h2>
                </div>

                <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>
                </div>

            </div>

        </div>

    );
}

export default IndividualCollegePage;