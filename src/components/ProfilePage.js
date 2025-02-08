import * as React from 'react';
import '../App.css';
import '../assets/css/IndividualCollege.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './college/TeamList';
import AnnouncementsList from './college/AnnouncementsList';
import GalleryList from './college/GalleryList';

function ProfilePage() {

    const location = useLocation();
    const data = location.state;

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setInputText(lowerCase);

    };

    return (
    
        <div>

            <div class='horizontalFlex centerButton paddingTop'>
                <img src={require(`../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1>{data.name}</h1>
            </div>

            <div class='extraWideColumnContainer'>
                    
                <div class='box' id='individualCollegeGallery'>
                    <h2>not logged in...no pictures to see</h2>

                    <GalleryList collegeID={data.id} />

                </div>

                <div class='box' id='individualCollegeRegisteredTeams'>
                    <div class='horizontalFlex spaceBetween' id='registeredTeamsSearch'>
                        <h2 class='noPadding noMargin'>Account Information</h2>

                        {/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
                        <div className="search">
                            <TextField
                                id="outlined-basic"
                                onChange={inputHandler}
                                variant="outlined"
                                fullWidth
                                label="Search"
                            />
                        </div>
                    </div>
                    
                    <TeamList input={inputText} collegeID={data.id} />

                </div>

                <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={data.id} />

                </div>

            </div>

        </div>

    );
}

export default ProfilePage;