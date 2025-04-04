import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../App.css';
import '../assets/css/TeamPage.css';

import UpcomingEventComponent from './profile/upcomingEventComponent';
import TeamMembersPanelDESKTOP from './team/TeamMembersPanelDESKTOP';
import TeamMembersPanelMOBILE from './team/TeamMembersPanelMOBILE';

function TeamPage() {
    const { id: teamID } = useParams(); 
    const [team, setTeam] = useState([]); 
    const [error, setError] = useState('');
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [email, setEmail] = useState('');
    const [teamMembers, setTeamMembers] = useState([]); 
    const [teamCaptain, setTeamCaptain] = useState([]);
    const [isEditingTeamBio, setIsEditingTeamBio] = useState(false);

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
                console.log(data);
                setTeam(data); 
                setTeamMembers(data.team_members);

                // Check for team captain
                teamMembers.forEach(teamCaptainCheck);

                console.log(teamCaptain);

            } catch (error) {
                console.error("Error fetching team data:", error);
                setError("Failed to load team data. Please try again.");
            }
        };

        fetchTeamData();
    }, [teamID]); //refetch when teamID is different

    if (!team) {
        return <div className="error">⚠️ {error || "Team not found"}</div>;
    }

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleTeamAction = async (action) => {
        if (!email) {
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

        const requestBody = { email, teamID };

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

    //find the next item
    const nextTeam = team.nextTeam || {};

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
                <h1>{team.name} Team Page</h1>
            </div>

            <div className='teamPageGrid'>
                {/* Team Profile Picture */}
                <div id='teamProfilePicture' className='center'>
                    {team.team_photo ? <img src={team.team_photo} className='smallLogo' alt="Team Logo" /> : "No photo to display"}
                </div>

                {/* Action Buttons */}
                <div id='teamActionButtons'>
                    <button className='heroButton' onClick={() => setShowJoinModal(true)}>Join Team</button>
                    <button className='heroButton' onClick={() => setShowLeaveModal(true)}>Leave Team</button>
                </div>
                {/* Join Team Modal */}
                {showJoinModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowJoinModal(false)}>X</button>
                            <h3>Join the Team</h3>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email to join"
                            />
                            <button className='heroButton' onClick={() => handleTeamAction('join')}>Join Team</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>
                )}
                {/* Leave Team Modal */}
                {showLeaveModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <button className="closeModalButton" onClick={() => setShowLeaveModal(false)}>X</button>
                            <h3>Leave the Team</h3>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email to leave"
                            />
                            <button className='heroButton' onClick={() => handleTeamAction('leave')}>Leave Team</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>
                )}

                {/* Team Members (Desktop & Mobile) */}
                <div id='teamMembersDESKTOP'><TeamMembersPanelDESKTOP teamMembers={teamMembers} teamCaptain={teamCaptain}/></div>
                <div id='teamMembersMOBILE'><TeamMembersPanelMOBILE teamMembers={teamMembers} teamCaptain={teamCaptain}/></div>

                {/* Upcoming Event */}
                <div id='teamEvents'>
                    <h2>Next Event</h2>
                    <UpcomingEventComponent
                        eventTitle="Opening Ceremonies"
                        team1Number={team.name}
                        team2Number={nextTeam.name || "TBA"}
                        location="123-A"
                        team1Logo={team.image || "https://placehold.co/100"}
                        team2Logo={nextTeam.image || "https://placehold.co/100"}
                        isYourTeam1={true}
                    />
                </div>

                {/* Team Bio */}
                <div id='teamBioInformation'>
                    <div className='horizontalFlex spaceBetween bioInformationHeader'>
                        <h2>Team Bio</h2>
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