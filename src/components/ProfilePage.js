import * as React from 'react';
import '../App.css';
import '../assets/css/ProfilePage.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './college/TeamList';
import AnnouncementsList from './college/AnnouncementsList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import data from '../assets/data/users.json';

function ProfilePage() {

    // const location = useLocation();

    const user = data[1];
;

    return (
    
        <div>

            {/* the header section */}
            <div class='horizontalFlex centerButton paddingTop'>
                {/* <img src={require(`../assets/images/${user.image}`)} class='smallLogo'></img> */}
                <h1>{user.name}</h1>
            </div>


                <div id='teamActionButtons'>
                    <button class='heroButton'>Leave Team</button>
                    <button class='heroButton'>Deactivate Account</button>
                </div>


            <div class='pageGrid'>

                <div class='box' id='accountInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Account Information</h2>
                    </div>
                    <div>
                        <p>College Affiliation: {user.collegeAffiliation || "University of Nebraska Lincoln"}</p>
                        <p>Username: {user.username || "user_name2024"}</p>
                        <p>Full Name: {user.fullName || "Jane Smith"}</p>
                        <p>Email Address: {user.email || "jsmith@unl.edu"}</p>
                    </div>
                </div>

                <div class='box' id='registrationInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Registration Information</h2>
                    </div>
                    <div class='verticalFlexMobile480 horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name: </p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>

                        <div>
                            <p>Registration Status</p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>

                        {/* <button class='heroButton' onClick={() => window.location.replace("/team")}>View Team</button> */}
                        
                    </div>
                </div>

                <div class='box' id='upcomingEvents'>
                    <h2>Upcoming Events</h2>
                    
                    <UpcomingEventComponent 
                        eventTitle="Opening Ceremonies"
                        team1Number="1"
                        team2Number="2"
                        location="123-A"
                        team1Logo="https://placehold.co/100"
                        team2Logo="https://placehold.co/100"
                        isYourTeam1={true}
                    />
                    
                    <UpcomingEventComponent 
                        eventTitle="Match 1: Round of 32"
                        team1Number="3"
                        team2Number="1"
                        location="456-B"
                        team1Logo="https://placehold.co/100"
                        team2Logo="https://placehold.co/100"
                        isYourTeam1={false}
                    />
                    
                    <UpcomingEventComponent 
                        eventTitle="Match 2: Round of 16"
                        team1Number="1"
                        team2Number="4"
                        location="2345-C"
                        team1Logo="https://placehold.co/100"
                        team2Logo="https://placehold.co/100"
                        isYourTeam1={true}
                    />
                </div>

{/* ICON FROM <a href="https://www.flaticon.com/free-icons/pencil" title="pencil icons">Pencil icons created by Pixel perfect - Flaticon</a> */}
                <div class='box' id='bioInformation'>
                    <div class='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>Your Bio</h2>
                        <button class='editButton'>
                            <img src={require('../assets/images/pencil.png')} class='editButton'></img>
                        </button>
                    </div>
                    <div>
                        <p>loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        
                    </div>
                </div>

                <div class='box' id='GalleryOnProfile'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Your Team's Gallery</h2>
                    </div>
                    <div>
                        {/* <GalleryList collegeID={data.id} /> */}
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