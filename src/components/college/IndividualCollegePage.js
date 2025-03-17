import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualCollege.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './TeamList';
import AnnouncementsList from './AnnouncementsList';
import GalleryList from './GalleryList';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';

function IndividualCollegePage() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [inputText, setInputText] = useState("");
    const [teamName, setTeamName] = useState(""); // Store the team name

    let inputHandler = (e) => {
        // Convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault(); // Prevent form submission

        console.log("Creating team...");

        if (!teamName.trim()) {
            alert("Please enter a valid team name.");
            return;
        }

        try {
            console.log("Making API request...");

            // You can set a fixed user ID or get it from elsewhere, depending on your use case
            const userEmail = "user@rit.edu"; // Replace with static or dynamic email
            if (!userEmail) {
                alert("Unable to retrieve user email.");
                return;
            }

            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTeam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamName: teamName,
                    collegeID: data.id, // Pass the college ID from props
                    userID: "USER_ID", // Replace with actual user ID if necessary
                    email: userEmail, // Include the email in the request
                }),
            });

            const result = await response.json();
            console.log(result);

            if (response.status === 201) {
                alert("Team created successfully!");
                window.location.reload(); // Refresh to show the new team
            } else {
                console.error(result);
                alert("Error creating team: " + result.body);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    };

    function handleClickGallery(collegeInfo) {
        navigate('/gallery');
    }

    return (
        <div>
            <div className='horizontalFlex centerButton paddingTop'>
                <img src={require(`../../assets/images/${data.image}`)} className='smallLogo' alt="College Logo" />
                <h1 className='collegeTitle'>{data.name}</h1>
            </div>

            <div className='extraWideColumnContainer'>
                
                <div className='box' id='individualCollegeGallery'>
                    <div className='horizontalFlex spaceBetween stickyHeader smallBottomMargin'>
                        <h2 className='noPadding noMargin'>Gallery</h2>
                        <div className='centerButton'>
                            <button className='standardButton' onClick={() => handleClickGallery(data.id)}>View More</button>
                        </div>
                    </div>

                    <GalleryList collegeID={data.id} />
                </div>

                <div className='box' id='individualCollegeRegisteredTeams'>
                    <div className='horizontalFlex spaceBetween stickyHeader'>
                        <div className='horizontalFlex'>
                            <h2 className='noPadding noMargin'>Registered Teams</h2>

                            <div className='centerButton' style={{ marginLeft: '24px' }}>
                                <Popup trigger={
                                    <button className='standardButton'>
                                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            Create Team <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                                        </div>
                                    </button>}
                                    modal nested>
                                    {
                                        close => (
                                            <div className='modal popup'>
                                                <div className='content'>
                                                    <h1 className='center'>Create Team</h1>

                                                    <form className='center' onSubmit={handleCreateTeam}>
                                                        <label htmlFor="teamName">Team Name: </label>
                                                        <input
                                                            type="text"
                                                            id="teamName"
                                                            name="teamName"
                                                            value={teamName}
                                                            onChange={(e) => setTeamName(e.target.value)}
                                                            style={{ marginBottom: '24px' }}
                                                        />
                                                        <div className='centerButton horizontalFlex spaceBetween' style={{ gap: '24px' }}>
                                                            <button
                                                                className='standardButton fullWidth'
                                                                type="submit" // This triggers the form submission
                                                            >
                                                                Save
                                                            </button>

                                                            <button className='redButton fullWidth' onClick={() => close()}>
                                                                Close
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </Popup>
                            </div>
                        </div>

                        {/* Search Bar */}
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

                <div className='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id} />
                </div>

            </div>
        </div>
    );
}

export default IndividualCollegePage;
