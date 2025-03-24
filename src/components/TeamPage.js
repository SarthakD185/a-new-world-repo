import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../App.css';
import '../assets/css/TeamPage.css';

import TeamList from './college/TeamList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import TeamMembersPanelDESKTOP from './team/TeamMembersPanelDESKTOP';
import TeamMembersPanelMOBILE from './team/TeamMembersPanelMOBILE';

function TeamPage() {
    const { id: teamID } = useParams(); 
    const [team, setTeam] = useState(null); 
    const [error, setError] = useState('');
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamByID?teamID=${teamID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeam(data); 
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
            : `https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/${action}Team`;

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
        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    //find the next item
    const nextTeam = team.nextTeam || {};

    return (
        <div>
            {/* Header */}
            <div className='verticalFlex centerButton paddingTop'>
                <h1>{team.name} - Global View</h1>
                <h1>College Number: {team.id}</h1>
            </div>

            <div className='teamPageGrid'>
                {/* Team Profile Picture */}
                <div id='teamProfilePicture'>
                    {team.image && <img src={team.image} className='smallLogo' alt="Team Logo" />}
                </div>

                {/* Action Buttons */}
                <div id='teamActionButtons'>
                    <button className='heroButton' onClick={() => handleTeamAction('join')}>Join Team</button>
                    <button className='heroButton' onClick={() => setShowLeaveModal(true)}>Leave Team</button>
                </div>

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
                <div id='teamMembersDESKTOP'><TeamMembersPanelDESKTOP /></div>
                <div id='teamMembersMOBILE'><TeamMembersPanelMOBILE /></div>

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
                    <h2>Team Bio</h2>
                    <p>{team.bio || "No bio available."}</p>
                </div>

                {/* Team Gallery */}
                <div id='teamGallery'>
                    <h2>Your Team's Gallery</h2>
                    {/* <GalleryList collegeID={team.id} /> */}
                </div>

                {/* Team Information */}
                <div id='teamAccountInformation'>
                    <h2>Team Information</h2>
                    <p>Team Name: {team.name}</p>
                    <p>Number of Players: {team.members || "N/A"}</p>
                    <p>College ID: {team.collegeID || "N/A"}</p>
                </div>

                {/* Registration Information */}
                <div id='teamRegistrationInformation'>
                    <h2>Registration Information</h2>
                    <div className='horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name:</p>
                            <img src="https://placehold.co/100" className='smallLogo' alt="Registration Logo" />
                        </div>
                        <div>
                            <p>Registration Status</p>
                            <img src="https://placehold.co/100" className='smallLogo' alt="Registration Status" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamPage;
