import * as React from 'react';
import '../App.css';
import '../assets/css/ProfilePage.css';
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";
import PendingAccountApprovalComponent from './profile/PendingAccountApprovalComponent';
import UpcomingEventComponent from './profile/upcomingEventComponent'; 
import { AccountContext } from '../Account'; //ID from previous file i made!
import Pool from '../UserPool';  

function ProfilePage() {
    const { id: userID } = useParams();
    const { email, role, isAuthenticated } = useContext(AccountContext);  //use new context here
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [isEditingUserBio, setIsEditingUserBio] = useState(false);

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
        try {
            const response = await fetch(`https://m375ypxakl.execute-api.us-east-1.amazonaws.com/production/getProfile`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            let json = JSON.parse(data.body);  
            setUser(json[0]);  
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to load user data. Please try again.");
        }
    };

{/* 
    //update user info
    const updateUserInfo = async (UserID, field, update) => {
        try {
            const response = await fetch(`https://u2so2b3hpc.execute-api.us-east-1.amazonaws.com/prod/updateUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: UserID,
                    field: field,
                    new: update
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to load user data. Please try again.");
        }
    };
    */}

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

    useEffect(() => {
        const cognitoUser = getCurrentCognitoUser(); 
        if (cognitoUser) {
            console.log("Cognito User:", cognitoUser);
        }

        getProfile();
    }, [userID]);

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
        
                        if (data.matches && Array.isArray(data.matches)) {
                            setGames(data.matches);
        
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

    //error
    if (!user && !isAuthenticated) {
        return <div className="error">⚠️ {error || "User not found"}</div>;
    }

    //tourney
    const approved = user && user.tournamentSignedUp ? <IoIosCheckmarkCircle /> : <GoXCircleFill />;

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
                        <button className='heroButton' onClick={() => navigate(`/team/${user.teamID}`)}>View My Team!</button>
                        <div className='horizontalFlex'>
                            {/* TODO - add button actions!!!!! */}
                            <button className='heroButton'>Leave Team</button>
                            <button className='heroButton'>Deactivate Account</button>
                        </div>
                    </>
                ) : (
                    // else, show this 'Join a Team!' button
                    <button className='heroButton' onClick={() => navigate(`/college/${user.collegeAffiliation}`)}>Join a Team!</button>
                )}
            </div>

            {user && user.tournamentSignedUp === false && <PendingAccountApprovalComponent />}

            <div className='pageGrid'>
                <div className='box' id='accountInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Account Information</h2> {approved}
                    </div>
                    <div>
                        <p>College Affiliation: {user ? user.collegeAffiliation : "University of Nebraska Lincoln"}</p>
                        <p>Username: {user ? user.username : "user_name2024"}</p>
                        <p>Full Name: {user ? `${user.firstname} ${user.lastname}` : "Jane Smith"}</p>
                        <p>Email Address: {email || "jsmith@unl.edu"}</p> {/* Use the email from context */}
                    </div>
                </div>

                {/* Additional sections */}
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
                    {/* <button className='heroButton' onClick={() => updateUserInfo(user.UserID, "bio", document.getElementById('bioInformationText').innerHTML)}>Update Bio</button> */}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
