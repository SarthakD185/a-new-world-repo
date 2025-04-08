import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../App.css';
import '../../assets/css/IndividualCollege.css';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import TeamList from './TeamList';
import AnnouncementsList from './AnnouncementsList';
import GalleryList from './GalleryList';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { AccountContext } from '../../Account';

function IndividualCollegePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; 
    const { isAuthenticated, role, email } = useContext(AccountContext);
    // State management
    const [teams, setTeams] = useState([]);
    const [inputText, setInputText] = useState("");
    const [teamName, setTeamName] = useState(""); 
    const [teamID, setTeamID] = useState(null); 
    const [userEmail, setUserEmail] = useState("");  
    const [showJoinPopup, setShowJoinPopup] = useState(false);  
    const [userTeamID, setUserTeamID] = useState(null);  
    const [isEmailValid, setIsEmailValid] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [isEditingCollegeBio, setIsEditingCollegeBio] = useState(false);
    const [collegeBio, setCollegeBio] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    //debounce ref
    const debounceTimeout = useRef(null);

    //fetch teams or college
    useEffect(() => {
        const fetchTeams = async () => {
            if (!data.id) return; 

            try {
                setLoading(true);
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeams?collegeID=${data.id}`);
                const result = await response.json();

                if (response.ok) {
                    setTeams(result.filter(team => team.CollegeID === parseInt(data.id)));
                } else {
                    console.error('Failed to fetch teams:', result);
                    setTeams([]); 
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
                setTeams([]); 
            } finally {
                setLoading(false);
            }
        };

        if (data.id) fetchTeams();
    }, [data.id]);

    useEffect(() => {
        // Edit Bio function
        const getCollegeBio = async (newBio) => {
            try {
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getCollegeBio?collegeID=${data.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch college bio');
                }
        
                const bioData = await response.json();
        
                if (bioData) {
                    setCollegeBio(bioData.bio); 
                } else {
                    throw new Error('Fetched data is not in expected format');
                }

            } catch (err) {
                console.error('Error fetching college bio:', err);
            }
        };

        if (data.id) getCollegeBio();
    }, [data.id]);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`https://m375ypxakl.execute-api.us-east-1.amazonaws.com/production/getProfile?email=${email}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
        
                const userData = await response.json();  

                if (userData[0]) {
                    setUserInfo(userData[0]); 
                } else {
                    throw new Error('Fetched data is not in expected format');
                }

            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        if (email) getUserInfo();
    }, [email]);

    //slowing doubming api call
    const inputHandler = (e) => {
        const value = e.target.value.toLowerCase();
        setInputText(value);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            console.log('Search Input after debounce:', value);
        }, 500);
    };

    //create team handler
    const handleCreateTeam = async (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            alert("Please enter a valid team name.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTeam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    teamName: teamName, 
                    collegeID: data.id,  
                    email: email,
                }),
            });

            const result = await response.json();

            if (response.status === 201) {
                alert("Team created successfully, awaiting Moderator approval!");
                window.location.reload();
            } else {
                alert("Error creating team: " + (result.body || "Unknown error"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the team.");
        } finally {
            setLoading(false);
        }
    };

    //join team handler
    const handleJoinTeam = (teamID) => {
        if (userTeamID) {
            alert("You are already in a team!");
            return;
        }
        if (!teamID) {
            console.error('Team ID is missing');
            return;
        }

        setTeamID(teamID);
        setShowJoinPopup(true);
    };

    //email handler
    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setUserEmail(emailValue);

        //email val
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setIsEmailValid(emailRegex.test(emailValue));
    };

    const handleEmailSubmit = async () => {
        if (!userEmail || !isEmailValid) {
            alert("Please provide a valid email.");
            return;
        }
    
        if (!teamID) {
            alert("Please select a team to join.");
            return;
        }
    
        try {
            setLoading(true);
    
            //logging for testing
            console.log("Email:", userEmail);
            console.log("Selected team ID:", teamID);
    
            const response = await fetch(
                `https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getUserByEmail?email=${encodeURIComponent(userEmail)}`
            );
    
            const result = await response.json();
    
            console.log('API Response:', result);
    
            if (!response.ok) {
                throw new Error('Failed to retrieve user from backend.');
            }
    
            
            if (response.status === 200 && result.userID) {
                
                const userID = result.userID;  
                setUserID(userID);  
    
                console.log('Attempting to join team with the following details:');
                console.log('teamID:', teamID);
                console.log('userID:', userID);
    
                //Use UserID to insert into teamMembers
                const joinResponse = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/joinTeam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        teamID: teamID,  
                        userID: userID,  
                        email: userEmail,
                    }),
                });
    
                const joinResult = await joinResponse.json();
                console.log("Join response:", joinResult); //logging
    
                if (joinResponse.status === 200) {
                    alert("Successfully joined the team!");
                    setShowJoinPopup(false);
                } else {
                    alert("Failed to join the team. Response: " + joinResult.message);
                }
            } else {
                alert("User not found or error retrieving user.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Edit Bio function
    const handleEditCollegeBio = async (newBio) => {
        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/editCollegeBio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collegeID: data.id,
                    newBio: newBio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit college bio');
            }

            //Success message
            alert("College bio updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error editing college bio:', err);
            alert('Failed to edit college bio');
        }
    };

    // Navigate to the gallery
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
                    <div className='horizontalFlex spaceBetween stickyHeader' style={{ gap: '16px'}}>
                        <div className='horizontalFlex'>
                            <h2 className='noPadding noMargin'>Registered Teams</h2>

                            {isAuthenticated && (
                                <Popup trigger={<button className='standardButton' style={{ marginLeft: '12px'}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        Create Team <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                                    </div>
                                </button>} modal nested>
                                    {close => (
                                        <div className='modal popup'>
                                            <div className='popupContent'>
                                                <h1 className='center'>Create Team</h1>
                                                <form className='center' onSubmit={handleCreateTeam}>
                                                    <label htmlFor="teamName">Team Name: </label>
                                                    <input 
                                                        type="text" 
                                                        id="teamName" 
                                                        value={teamName} 
                                                        onChange={(e) => setTeamName(e.target.value)} 
                                                        style={{ marginBottom: '24px' }} 
                                                    />
                                                    <div className='centerButton horizontalFlex spaceBetween' style={{ gap: '24px' }}>
                                                        <button className='standardButton fullWidth' style={{ backgroundColor: '#F47A60' }} onClick={() => close()}>Close</button>
                                                        <button className='standardButton fullWidth' type="submit" disabled={loading}>Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            )}
                            
                        </div>
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
                    <TeamList teams={teams} input={inputText} collegeID={data.id || ""} onJoinTeam={handleJoinTeam} /> 
                </div>

                <div className='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id} />
                </div>

                <div className='box' id='individualCollegeBio'>
                    <div className='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>College Bio</h2>
                        {/* Only show edit button if user is admin, moderator, or marketer */}
                        {(role === 'Admin' || (role === 'Moderator' && data.name === userInfo.college) || (role === 'Marketer' && data.name === userInfo.college)) && (
                            <button className='editButton'>
                                <img 
                                    src={isEditingCollegeBio ? require('../../assets/images/saveIcon.png') : require('../../assets/images/pencil.png')}  
                                    className='editButton' 
                                    alt="Edit Bio" 
                                    onClick={() => {

                                        setIsEditingCollegeBio(prev => !prev);

                                        const bioText = document.getElementById('collegeBioInformationText');
                                        const textarea = bioText.querySelector('textarea');
                                        
                                        if (textarea) {
                                            // Save the text and convert back to div
                                            const newText = textarea.value;
                                            bioText.innerHTML = `<p>${newText}</p>`;
                                            handleEditCollegeBio(newText);
                                        } else {
                                            // Convert to textarea
                                            const currentText = bioText.innerText;
                                            bioText.innerHTML = `<textarea placeholder="Type Your Bio Here!" style="width: 100%; min-height: 100px;">${currentText}</textarea>`;
                                        }
                                    }}
                                />
                            </button>
                        )}
                    </div>
                    <div id='collegeBioInformationText'>
                        <p>{data.id && collegeBio ? collegeBio : "No bio available."}</p>
                    </div>
                </div>
            </div>

            {/* Join Team Email Popup */}
            {showJoinPopup && (
                <Popup open={showJoinPopup} onClose={() => setShowJoinPopup(false)}>
                    <div className='popup'>
                        <div className='content'>
                            <h2>Enter your Email to Join Team</h2>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={userEmail}
                                onChange={handleEmailChange}
                                style={{ marginBottom: '20px' }}
                            />
                            <button className="standardButton" onClick={handleEmailSubmit} disabled={loading}>
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
