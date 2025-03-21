import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualCollege.css';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './TeamList';
import AnnouncementsList from './AnnouncementsList';
import GalleryList from './GalleryList';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';

function IndividualCollegePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; 
    
    const [teams, setTeams] = useState([]);
    const [inputText, setInputText] = useState("");
    const [teamName, setTeamName] = useState(""); 
    const [teamID, setTeamID] = useState(null); 
    const [email, setEmail] = useState("");  
    const [showJoinPopup, setShowJoinPopup] = useState(false);  
    const [userTeamID, setUserTeamID] = useState(null);  

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeams?collegeID=${data.id}`);
                const result = await response.json();
                if (response.ok) {
                    const filteredTeams = result.filter(team => team.CollegeID === parseInt(data.id));
                    setTeams(filteredTeams);  
                } else {
                    console.error('Failed to fetch teams:', result);
                    setTeams([]);  
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
                setTeams([]); 
            }
        };

        const checkUserTeam = async () => {
            try {
                // Fetch the current user's team ID
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getUserTeamID?email=' + email);
                const result = await response.json();
                if (response.ok && result.teamID) {
                    setUserTeamID(result.teamID);  //set teamID
                } else {
                    setUserTeamID(null);//user has no team
                }
            } catch (error) {
                console.error("Error fetching user team:", error);
            }
        };

        if (data.id) {
            fetchTeams();
            checkUserTeam(); 
        }
    }, [data.id, email]);  

    const inputHandler = (e) => {
        setInputText(e.target.value.toLowerCase());
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            alert("Please enter a valid team name.");
            return;
        }
        try {
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTeam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamName: teamName,
                    collegeID: data.id || "",
                }),
            });

            if (response.status === 405) {
                console.error("405 Method Not Allowed. Check if the API endpoint allows POST requests.");
                alert("Error: Method Not Allowed. Please check with the server administrator.");
                return;
            }

            const result = await response.json();
            if (response.status === 201) {
                alert("Team created successfully!");
                window.location.reload();
            } else {
                console.error("Error response:", result);
                alert("Error creating team: " + (result.body || "Unknown error"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the team.");
        }
    };

    const handleJoinTeam = (teamID) => {
        if (userTeamID) {
            alert("You are already in a team!");
            return;
        }

        if (!teamID) {
            console.error('Team ID is missing');
            return;
        }
        console.log('Team ID:', teamID); // Log the team ID instead of selectedTeamID
        setTeamID(teamID);  // Set the team ID to join
        setShowJoinPopup(true);  // Show the email input popup for joining team
    };

    const handleEmailSubmit = async () => {
        if (!email) {
            alert("Please provide a valid email.");
            return;
        }
    
        // Basic email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Please provide a valid email.");
            return;
        }
    
        try {
            console.log('Email:', email);
            console.log('Team ID:', teamID);
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getUserByEmail?email=${email}&teamID=${teamID}`);
            const result = await response.json();
    
            console.log('Response:', response);
            console.log('Result:', result);
    
            if (response.status === 200 && result.UserID) {
                const userID = result.UserID;
    
                //jointeam
                const joinResponse = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/joinTeam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        teamID: teamID,
                        userID: userID,
                        email: email,
                    }),
                });
    
                const joinResult = await joinResponse.json();
                console.log("Join Response Status:", joinResponse.status);
                console.log("Join Result:", joinResult);
    
                if (joinResponse.status === 200) {
                    alert("Successfully joined the team!");
                    setShowJoinPopup(false);
                    window.location.reload();
                } else {
                    //logging
                    console.error("Join Failed:", joinResult);
                    alert("Failed to join the team. Response: " + (joinResult.body || joinResult.message || "Unknown error"));
                }
            } else {
                console.error('User not found:', result);
                alert("User not found or error retrieving user.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while joining the team. See console for details.");
        }
    };

    const handleClickGallery = () => {
        navigate('/gallery');
    };

    return (
        <div>
            <div className='horizontalFlex centerButton paddingTop'>
                {data.image && <img src={require(`../../assets/images/${data.image}`)} className='smallLogo' alt="College Logo" />}
                <h1 className='collegeTitle'>{data.name || "Unknown College"}</h1>
            </div>

            <div className='extraWideColumnContainer'>
                <div className='box' id='individualCollegeGallery'>
                    <div className='horizontalFlex spaceBetween stickyHeader smallBottomMargin'>
                        <h2 className='noPadding noMargin'>Gallery</h2>
                        <button className='standardButton' onClick={handleClickGallery}>View More</button>
                    </div>
                    <GalleryList collegeID={data.id || ""} />
                </div>

                <div className='box' id='individualCollegeRegisteredTeams'>
                    <div className='horizontalFlex spaceBetween stickyHeader'>
                        <div className='horizontalFlex'>
                            <h2 className='noPadding noMargin'>Registered Teams</h2>
                            <Popup trigger={<button className='standardButton'>
                                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        Create Team <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                                    </div>
                                </button>} modal nested>
                                {close => (
                                    <div className='modal popup'>
                                        <div className='content'>
                                            <h1 className='center'>Create Team</h1>
                                            <form className='center' onSubmit={handleCreateTeam}>
                                                <label htmlFor="teamName">Team Name: </label>
                                                <input type="text" id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} style={{ marginBottom: '24px' }} />
                                                <div className='centerButton horizontalFlex spaceBetween' style={{ gap: '24px' }}>
                                                    <button className='standardButton fullWidth' type="submit">Save</button>
                                                    <button className='redButton fullWidth' onClick={() => close()}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                        <div className="search">
                            <TextField id="outlined-basic" onChange={inputHandler} variant="outlined" fullWidth label="Search" />
                        </div>
                    </div>
                    <TeamList teams={teams} input={inputText} collegeID={data.id || ""} onJoinTeam={handleJoinTeam} /> 
                </div>

                <div className='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id || ""} />
                </div>
            </div>

            {/* Popup for Join Team email input */}
            {showJoinPopup && (
                <Popup open={showJoinPopup} onClose={() => setShowJoinPopup(false)}>
                    <div className='popup'>
                        <div className='content'>
                            <h2>Enter your Email to Join Team</h2>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            />
                            <button className="standardButton" onClick={handleEmailSubmit}>
                                Submit
                            </button>
                            <button className="redButton" onClick={() => setShowJoinPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    );
}

export default IndividualCollegePage;
