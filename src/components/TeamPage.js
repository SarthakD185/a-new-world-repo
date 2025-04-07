import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../App.css';
import '../assets/css/TeamPage.css';
import { AccountContext } from '../Account';

import UpcomingEventComponent from './profile/upcomingEventComponent';
import TeamMembersPanelDESKTOP from './team/TeamMembersPanelDESKTOP';
import TeamMembersPanelMOBILE from './team/TeamMembersPanelMOBILE';

function TeamPage() {
    const { id: teamID } = useParams(); 
    const { isAuthenticated, role, email } = useContext(AccountContext);
    const [team, setTeam] = useState([]); 
    const [error, setError] = useState('');
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showTeamCaptainModal, setShowTeamCaptainModal] = useState(false);
    const [showRemoveTeamCaptainModal, setShowRemoveTeamCaptainModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [teamMembers, setTeamMembers] = useState([]); 
    const [teamCaptain, setTeamCaptain] = useState([]);
    const [isEditingTeamBio, setIsEditingTeamBio] = useState(false);
    const [games, setGames] = useState([]);

    function teamCaptainCheck(member) {
        if(member.IS_CAPTAIN === 1) {
            setTeamCaptain(member);
        }
    };

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/teamPageData?teamID=${teamID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeam(data); 
                setTeamMembers(data.team_members[0]);

                // Check for team captain
                data.team_members[0].forEach(teamCaptainCheck);

            } catch (error) {
                console.error("Error fetching team data:", error);
                setError("Failed to load team data. Please try again.");
            }
        };

        fetchTeamData();
    }, [teamID]); //refetch when teamID, teamCaptain, or teamMembers are different

    //Fetch games on mount
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/fetchTeamMatches?teamID=${teamID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                console.log('Fetched data:', data);

                if (data.matches && Array.isArray(data.matches)) {
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
        };

        fetchGames();
        // eslint-disable-next-line
    }, [teamID]);

    if (!team) {
        return <div className="error">⚠️ {error || "Team not found"}</div>;
    }

    const handleEmailChange = (e) => setUserEmail(e.target.value);

    const handleTeamAction = async (action) => {
        if (!userEmail) {
            setError('Please enter your email before proceeding.');
            return;
        }
        if (!teamID) {
            setError('No team selected.');
            return;
        }

        const apiUrl = action === 'leave' 
            ? 'https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/leaveTeam' 
            : `https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/joinTeam`;

        const requestBody = {
            email: userEmail,
            teamID: teamID,
        };

        try {
            console.log(`Sending ${action} request with data:`, requestBody);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Successfully ${action}ed team:`, data);
            setShowLeaveModal(false);
            setShowJoinModal(false);
        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    const handleBecomeTeamCaptain = async () => {
        if (!userEmail) {
            setError('Please enter your email before proceeding.');
            return;
        }
        if (!teamID) {
            setError('No team selected.');
            return;
        }

        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/becomeTeamCaptain`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Successfully became team captain:`, data);
            setShowTeamCaptainModal(false);
        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    const handleRemoveTeamCaptain = async () => {
        if (!userEmail) {
            setError('Please enter your email before proceeding.');
            return;
        }
        if (!teamID) {
            setError('No team selected.');
            return;
        }

        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/removeTeamCaptain`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Successfully gave up team captain status:`, data);
            setShowRemoveTeamCaptainModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    // Edit Bio function
    const handleEditTeamBio = async (newBio) => {
        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/editTeamBio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamID: teamID,
                    newBio: newBio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit team bio');
            }

            //Success message
            alert("Team bio updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error editing team bio:', err);
            alert('Failed to edit team bio');
        }
    };

    return (
        <div>
            {/* Header */}
            <div className='verticalFlex centerButton paddingTop'>
                <h1>{team.team_name} Team Page</h1>
            </div>

            <div className='teamPageGrid'>
                {/* Team Profile Picture */}
                <div id='teamProfilePicture' className='center'>
                    {team.team_photo ? <img src={team.team_photo} className='smallLogo' alt={`${team.team_name} Logo`} /> : "No photo to display"}
                </div>

                {/* Action Buttons */}
                {isAuthenticated && (
                    <div id='teamActionButtons'>
                        <button className='heroButton' onClick={() => setShowJoinModal(true)}>Join Team</button>
                        <button className='heroButton' onClick={() => setShowLeaveModal(true)}>Leave Team</button>
                        {(teamCaptain.length === 0) && (
                            <button className='heroButton' onClick={() => setShowTeamCaptainModal(true)}>Become Team Captain</button>
                        )}
                        {(teamCaptain && teamCaptain.IS_CAPTAIN === 1 && teamCaptain.email === email) && (
                            <button className='heroButton' onClick={() => setShowRemoveTeamCaptainModal(true)}>Give Up Team Captain Status</button>
                        )}
                    </div>
                )}

                {/* Join Team Modal */}
                {showJoinModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowJoinModal(false)}>X</button>
                            <div className='verticalFlex'>
                                <h3>Join the Team</h3>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email to join"
                                />
                                <button className='heroButton' onClick={() => handleTeamAction('join')}>Join Team</button>
                                {error && <div className="error">{error}</div>}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Leave Team Modal */}
                {showLeaveModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowLeaveModal(false)}>X</button>
                            <div className='verticalFlex'>
                                <h3>Leave the Team</h3>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email to leave"
                                />
                                <button className='heroButton' onClick={() => handleTeamAction('leave')}>Leave Team</button>
                                {error && <div className="error">{error}</div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Become Team Captain Modal */}
                {showTeamCaptainModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowTeamCaptainModal(false)}>X</button>
                            <div className='verticalFlex'>
                                <h3>Become Team Captain</h3>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email to become the team captain"
                                />
                                <button className='heroButton' onClick={handleBecomeTeamCaptain}>Become Team Captain</button>
                                {error && <div className="error">{error}</div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Remove Team Captain Modal */}
                {showRemoveTeamCaptainModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowRemoveTeamCaptainModal(false)}>X</button>
                            <div className='verticalFlex'>
                                <h3>Remove Team Captain</h3>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email to remove the team captain"
                                />
                                <button className='heroButton' onClick={handleRemoveTeamCaptain}>Give Up Team Captain Status</button>
                                {error && <div className="error">{error}</div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Team Members (Desktop & Mobile) */}
                <div id='teamMembersDESKTOP'><TeamMembersPanelDESKTOP teamMembers={teamMembers}/></div>
                <div id='teamMembersMOBILE'><TeamMembersPanelMOBILE teamMembers={teamMembers}/></div>

                {/* Upcoming Event */}
                <div id='teamEvents'>
                    <h2>Upcoming Events</h2>
                    <UpcomingEventComponent games = {games}/>
                </div>

                {/* Team Bio */}
                <div id='teamBioInformation'>
                    <div className='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>Team Bio</h2>
                        {/* Only show edit button if user is admin, moderator, or team captain */}
                        {(role === 'Admin' || role === 'Moderator' || (teamCaptain && teamCaptain.IS_CAPTAIN === 1 && teamCaptain.email === email)) && (
                            <button className='editButton'>
                                <img 
                                    src={isEditingTeamBio ? require('../assets/images/saveIcon.png') : require('../assets/images/pencil.png')} 
                                    className='editButton' 
                                    alt="Edit Bio" 
                                    onClick={() => {
                                        setIsEditingTeamBio(prev => !prev);

                                        const bioText = document.getElementById('teamBioInformationText');
                                        const textarea = bioText.querySelector('textarea');
                                        
                                        if (textarea) {
                                            // Save the text and convert back to div
                                            const newText = textarea.value;
                                            bioText.innerHTML = `<p>${newText}</p>`;
                                            handleEditTeamBio(newText);
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
                    <div id='teamBioInformationText'>
                        <p>{team.team_blurb || "No bio available."}</p>
                    </div>
                </div>

                {/* Team Information */}
                <div id='teamAccountInformation'>
                    <h2>Team Information</h2>
                    <p style={{marginBottom: '8px'}}>Team Name: {team.team_name}</p>
                    <p style={{marginBottom: '8px'}}>Number of Players: {teamMembers ? teamMembers.length : "N/A"}</p>
                    <p style={{marginBottom: '8px'}}>College Name: {team.college_name ? team.college_name : "N/A"}</p>
                </div>

            </div>
        </div>
    );
}

export default TeamPage;    