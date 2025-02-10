import * as React from 'react';
import '../App.css';
import '../assets/css/ProfilePage.css';
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

            {/* the header section */}
            <div class='horizontalFlex centerButton paddingTop'>
                <img src={require(`../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1>{data.name}</h1>
            </div>

            <div class='pageGrid'>
                    
   
                    <div id='teamActionButtons'>
                        <button class='heroButton'>Leave Team</button>
                        <button class='heroButton'>Deactivate Account</button>
                    </div>


                <div class='box' id='accountInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Account Information</h2>
                    </div>
                    <div>
                        <p>College Affiliation:</p>
                        <p>Username:</p>
                        <p>Full Name:</p>
                        <p>Email Address</p>
                        
                    </div>
                </div>

                <div class='box' id='registrationInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Registration Information</h2>
                    </div>
                    <div class='horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name:</p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>

                        <div>
                            <p>Registration Status</p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>
                        
                    </div>
                </div>

                <div class='box' id='upcomingEvents'>
                    <h2>Upcoming Events</h2>

                    <h3>Opening Ceremony</h3>
                    <p>Room: Auditorium A</p>
                    <hr></hr>
                    <h4>Match 1: Round of 32</h4>
                    <p>YOUR TEAM Team 1[image] vs Team 2[image]</p>
                    <p>Room: 123-A</p>
                    <hr></hr>
                    <h4>Game 2</h4>
                    <p>Team 3[image] vs YOUR TEAM Team 1[image]</p>
                    <p>Room: 456-B</p>
                    <hr></hr>
                    <h4>Game 3</h4>
                    <p>YOUR TEAM Team 1[image] vs Team 4[image]</p>
                    <p>Room: 2345-C</p>
                    <hr></hr>
                </div>


                <div class='box' id='bioInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Your Bio</h2>
                    </div>
                    <div>
                        <p>loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        
                    </div>
                </div>

                <div class='box' id='teamGallery'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Your Team's Gallery</h2>
                    </div>
                    <div>
                        <GalleryList collegeID={data.id} />
                    </div>
                </div>
               



                {/* <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={data.id} />

                </div> */}

            </div>

        </div>

    );
}

export default ProfilePage;