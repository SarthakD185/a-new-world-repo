import * as React from 'react';
import '../App.css';
import '../assets/css/ProfilePage.css';
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './college/TeamList';
import AnnouncementsList from './college/AnnouncementsList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import data from '../assets/data/users.json';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";

function ProfilePage() {
    const { id: userID } = useParams(); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch(`https://m375ypxakl.execute-api.us-east-1.amazonaws.com/production/getProfile`); {/*userID=${userID} */}
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                let json = data.body;
                json = JSON.parse(json)
                setUser(json[0]); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data. Please try again.");
            }
        };

        getProfile();
    }, [userID]); // Refetch when userID is different
    let approved = "";
    if (!user) {
        return <div className="error">⚠️ {error || "User not found"}</div>;
    } else {
        console.log(user);
        console.log(user.username);
        approved = user.tournamentSignedUp === true ? <IoIosCheckmarkCircle/> : <GoXCircleFill/>;
    }



    return (
        <div>
            {/* The header section */}
            <div className='horizontalFlex centerButton paddingTop'>
                <h1>{user.name}</h1>
            </div>

            <div id='teamActionButtons'>
                <button className='heroButton'>Leave Team</button>
                <button className='heroButton'>Deactivate Account</button>
                <button className='heroButton'>VIEW MY TEAM</button>
            </div>

            <div className='pageGrid'>
                <div className='box' id='accountInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Account Information</h2> {approved}
                    </div>
                    <div>
                        <p>College Affiliation: {user.collegeAffiliation || "University of Nebraska Lincoln"}</p>
                        <p>Username: {user.username || "user_name2024"}</p>
                        <p>Full Name: {user.firstname+" "+user.lastname || "Jane Smith"}</p>
                        <p>Email Address: {user.email || "jsmith@unl.edu"}</p>
                    </div>
                </div>

                <div className='box' id='registrationInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Registration Information</h2>
                    </div>
                    <div className='verticalFlexMobile480 horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name: </p>
                            <img src={"https://placehold.co/100"} className='smallLogo' alt="Team Logo" />
                        </div>

                        <div>
                            <p>Registration Status</p>
                            <img src={"https://placehold.co/100"} className='smallLogo' alt="Registration Status" />
                        </div>
                    </div>
                </div>

                <div className='box' id='upcomingEvents'>
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

                <div className='box' id='bioInformation'>
                    <div className='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>Your Bio</h2>
                        <button className='editButton'>
                            <img src={require('../assets/images/pencil.png')} className='editButton' alt="Edit Bio" />
                        </button>
                    </div>
                    <div>
                        <p>loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default ProfilePage;
