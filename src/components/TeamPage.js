import * as React from 'react';
import '../App.css';
import '../assets/css/TeamPage.css';

import TeamList from './college/TeamList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import TeamMemberCard from './team/TeamMemberCard';

import teamData from '../assets/data/teams.json';
import users from '../assets/data/users.json';
import TeamMembersPanelDESKTOP from './team/TeamMembersPanelDESKTOP';
import TeamMembersPanelMOBILE from './team/TeamMembersPanelMOBILE';

// Add a join team button. View team on individual college page leads to this page.
// And there's a join team on this page

function TeamPage() {
    const teamID = 3; // Assuming we're looking at teamID 3

    // Logs the join/leave button click to the console. Doesn't actually do anything yet.
    const handleTeamAction = (action) => {
        console.log(`${action} ${teamID} team...`);
        // Handle the action logic here (e.g., send to server, update state, etc.)
    };

    return (
        <div>
            {/* The header section */}
            <div className='verticalFlex centerButton paddingTop'>
                <h1>{teamData[teamID].name} - Global View</h1>
                <h1>College Number: {teamData[teamID].id}</h1>
            </div>

            <div className='teamPageGrid'>
                {/* Team's profile picture */}
                <div className='box' id='teamProfilePicture'>
                    <img src={teamData[teamID].image} className='smallLogo' alt="Team Logo" />
                </div>

                {/* Action buttons */}
                <div id='teamActionButtons'>
                    <button className='heroButton' onClick={() => handleTeamAction('join')}>Join Team</button>
                    <button className='heroButton' onClick={() => handleTeamAction('leave')}>Leave Team</button>
                </div>

                {/* Team Members - Desktop View */}
                <div className='box' id='teamMembersDESKTOP'>
                    <TeamMembersPanelDESKTOP />
                </div>
                
                {/* Team Members - Mobile View */}
                <div className='box' id='teamMembersMOBILE'>
                    <TeamMembersPanelMOBILE />
                </div>

                {/* Upcoming Event */}
                <div className='box' id='teamEvents'>
                    <h2>Next Event</h2>
                    <UpcomingEventComponent
                        eventTitle="Opening Ceremonies"
                        team1Number={teamData[teamID].name}
                        team2Number={teamData[teamID + 1].name}
                        location="123-A"
                        team1Logo="https://placehold.co/100"
                        team2Logo="https://placehold.co/100"
                        isYourTeam1={true}
                    />
                </div>

                {/* Team Bio */}
                <div className='box' id='teamBioInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Team Bio</h2>
                    </div>
                    <div>
                        <p>{teamData[teamID].bio}</p>
                    </div>
                </div>

                {/* Team Gallery */}
                <div className='box' id='teamGallery'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>Your Team's Gallery</h2>
                    </div>
                    <div>
                        {/* Gallery List - Uncomment if needed */}
                        {/* <GalleryList collegeID={TeamList.id} /> */}
                    </div>
                </div>

                {/* Team Information */}
                <div className='box' id='teamAccountInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Team Information</h2>
                    </div>
                    <div>
                        <p>Team Name: {teamData[teamID].name}</p>
                        <p>Number of Players: {teamData[teamID].members}</p>
                        <p>College ID: {teamData[teamID].collegeID}</p>
                    </div>
                </div>

                {/* Registration Information */}
                <div className='box' id='teamRegistrationInformation'>
                    <div className='horizontalFlex spaceBetween'>
                        <h2>Registration Information</h2>
                    </div>
                    <div className='horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name:</p>
                            <img src={"https://placehold.co/100"} className='smallLogo' alt="Registration Logo" />
                        </div>

                        <div>
                            <p>Registration Status</p>
                            <img src={"https://placehold.co/100"} className='smallLogo' alt="Registration Status" />
                        </div>
                    </div>
                </div>

                {/* Announcements - Optional, uncomment if needed */}
                {/* <div className='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={teamData.id} />
                </div> */}
            </div>
        </div>
    );
}

export default TeamPage;
