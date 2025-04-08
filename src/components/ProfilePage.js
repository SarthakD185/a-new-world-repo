import * as React from 'react';
import '../App.css';
import '../assets/css/ProfilePage.css';
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PendingAccountApprovalComponent from './profile/PendingAccountApprovalComponent';
import UpcomingEventComponent from './profile/upcomingEventComponent'; 
import { AccountContext } from '../Account'; //ID from previous file i made!
import Pool from '../UserPool';  

function ProfilePage() {
    const { id: userID } = useParams();
    const { email } = useContext(AccountContext);  //use new context here
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [isEditingUserBio, setIsEditingUserBio] = useState(false);
    const [teamName, setTeamName] = useState(null);
    const [showOptOutModal, setShowOptOutModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [collegeInfo, setCollegeInfo] = useState(null);

    //dont really need this anymore
    const getCurrentCognitoUser = () => {
        const cognitoUser = Pool.getCurrentUser();
        if (!cognitoUser) {
            console.error("No current user found in Cognito.");
            return null;
        }
        return cognitoUser;
    };

    //prof data
    const getProfile = async () => {
        if (!email) {
            setError("Email is not available");
            return; // Early exit if email is not available
        }
    
        try {
            const response = await fetch(`https://m375ypxakl.execute-api.us-east-1.amazonaws.com/production/getProfile?email=${email}`);
            
            // Log the raw response for debugging
            console.log("API Response:", response);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Directly parse the response as JSON
            const data = await response.json();
            
            // Assuming the data is an array and we want the first user in that array
            if (Array.isArray(data) && data.length > 0) {
                setUser(data[0]);  // Directly use the first object in the array
            } else {
                setError("No user data found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to load user data. Please try again.");
        }
    };    

    // Edit Bio function
    const handleEditUserBio = async (newBio) => {
        try {
            const response = await fetch(`https://u2so2b3hpc.execute-api.us-east-1.amazonaws.com/prod/updateUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.UserID,
                    newBio: newBio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit user bio');
            }

            //Success message
            alert("User bio updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error editing user bio:', err);
            alert('Failed to edit user bio');
        }
    };

    const handleLeaveTeam = async () => {

        const requestBody = {
            email: email,
            teamID: user.teamID,
        };

        try {
            console.log(`Sending leave request with data:`, requestBody);
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/leaveTeam', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Successfully opted out of tournament and left team:`, data);

            setShowOptOutModal(false);

        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const cognitoUser = getCurrentCognitoUser(); 
        if (cognitoUser) {
            console.log("Cognito User:", cognitoUser);
        }

        getProfile();
    }, [email, userID]);

    useEffect(() => {
        const getTeamName = async () => {
            if(user){
                if(user.teamID){
                    try {
                        const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamByID?teamID=${user.teamID}`, {
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
                        if (data && data.team && data.team.TEAM_NAME) {
                            setTeamName(data.team.TEAM_NAME);  
                        } else {
                            setError("No team found.");
                        }
                    } catch (error) {
                        console.error("Error fetching team name:", error);
                        setError("Failed to load team name. Please try again.");
                    }
                }
            }
        };
        getTeamName();
    }, [email, userID, user]);

    //fetch collegeID and filename for user's college
    useEffect(() => {
        const getCollegeInfo = async () => {
            if(user){
                if(user.college){
                    try {
                        const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getCollegeByName?college=${user.college}`, {
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
                            setCollegeInfo(data);  
                        } else {
                            setError("No team found.");
                        }
                    } catch (error) {
                        console.error("Error fetching team name:", error);
                        setError("Failed to load team name. Please try again.");
                    }
                }
            }
        };
        getCollegeInfo();
    }, [email, userID, user]);

    //Fetch games on mount
    useEffect(() => {
        const fetchGames = async () => {
            if(user) {
                if(user.teamID){
                    try {
                        const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/fetchTeamMatches?teamID=${user.teamID}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch games');
                        }
                        const data = await response.json();
                        console.log('Fetched data:', data);

                        if(data.matches && Array.isArray(data.matches)) {

                            setGames(data.matches);

                        } else if (data) {
                            
                            console.log('No matches for this team');
        
                        } else {
                            throw new Error('Fetched data is not in expected format');
                        }
        
                    } catch (error) {
                        console.error('Error fetching games:', error);
                        setError('Error fetching games. Please try again later.');
                    }
                }
            }
        };

        fetchGames();

    }, [user]);

    //logging user email found in context
    console.log("User email from AccountContext:", email);

    const handleEmailChange = (e) => setUserEmail(e.target.value);

    //error
    if (error) {
        return <div className="error">⚠️ {error}</div>;
    }
    
    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            {/* The header section */}
            <div className='horizontalFlex centerButton paddingTop'>
                <h1>{user ? `${user.firstname}'s Profile` : 'Profile'}</h1>
            </div>

            <div id='profilePageTeamActionButtons'>
                {/*conditionally show these buttons only if user has a team */}
                {user && user.teamID ? (
                    <>
                        <div className='horizontalFlex'>
                            <button className='heroButton' onClick={() => navigate(`/team/${user.teamID}`)}>View My Team!</button>
                            <button className='heroButton' onClick={() => setShowOptOutModal(true)}>Opt Out of Tournament</button>
                        </div>
                    </>
                ) : (
                    // else, show this 'Join a Team!' button
                    <button className='heroButton' onClick={() => navigate('/individualCollege', { state: { id: collegeInfo.CollegeID, name: collegeInfo.COLLEGE_NAME, filename: collegeInfo.filename } })}>Join a Team!</button>
                )}
            </div>

            {/* Opt Out Modal */}
            {showOptOutModal && (
                <div className="modal">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={() => setShowOptOutModal(false)}>X</button>
                        <div className='verticalFlex'>
                            <h3>Opt Out of Tournament</h3>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={handleEmailChange}
                                placeholder="Enter your email to opt out"
                            />
                            <button className='heroButton' onClick={handleLeaveTeam}>Opt Out</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>
                </div>
            )}

            {user && user.tournamentSignedUp === false && <PendingAccountApprovalComponent />}

            <div className='pageGrid'>
                <div className='box' id='accountInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Account Information</h2>
                    </div>
                    <div>
                        <p>Registration Status: {(user && user.Approved && user.teamID && teamName) ? `Registered with ${teamName}` : "Not registered (join a team)"}</p>
                        <p>College Affiliation: {(user && user.college) ? user.college : "Unknown"}</p>
                        <p>Username: {(user && user.username) ? user.username : "Unknown"}</p>
                        <p>Full Name: {(user && user.firstname && user.lastname) ? `${user.firstname} ${user.lastname}` : "Unknown"}</p>
                        <p>Email Address: {(user && email) || "Unknown"}</p> {/* Use the email from context */}
                    </div>
                </div>

                <div className='box' id='upcomingEvents'>
                    <h2>Upcoming Events</h2>
                    <UpcomingEventComponent games = {games} />
                </div>

                {/* Bio information */}
                <div className='box' id='bioInformation'>
                    <div className='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>Your Bio</h2>
                        <button className='editButton'>
                            <img 
                                src={isEditingUserBio ? require('../assets/images/saveIcon.png') : require('../assets/images/pencil.png')}  
                                className='editButton' 
                                alt="Edit Bio" 
                                onClick={() => {

                                    setIsEditingUserBio(prev => !prev);

                                    const bioText = document.getElementById('bioInformationText');
                                    const textarea = bioText.querySelector('textarea');
                                    
                                    if (textarea) {
                                        // Save the text and convert back to div
                                        const newText = textarea.value;
                                        bioText.innerHTML = `<p>${newText}</p>`;
                                        handleEditUserBio(newText);
                                    } else {
                                        // Convert to textarea
                                        const currentText = bioText.innerText;
                                        bioText.innerHTML = `<textarea placeholder="Type Your Bio Here!" style="width: 100%; min-height: 100px;">${currentText}</textarea>`;
                                    }
                                }}
                            />
                        </button>
                    </div>
                    <div id='bioInformationText'>
                        <p>{user && user.bio ? user.bio : "No bio available."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
