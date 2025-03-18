import * as React from 'react';
import '../App.css';
import '../assets/css/TeamPage.css';

import TeamList from './college/TeamList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import TeamMemberCard from './team/TeamMemberCard';

import teamData from '../assets/data/teams.json';
import users from '../assets/data/users.json';


// add a join team button. view team on indiv colleg epage leads to this page. and theres a join team on this page


function TeamPage() {

    const teamID = 3;


    // logs the join/leave button click to the console. Doesn't actually do anything yet.
   
    const handleTeamAction = (action) => {
        console.log(`${action} ${teamID} team...`);
    };

    return (
    
        <div>
            {/* the header section */}
            <div class='verticalFlex centerButton paddingTop'>
                <h1>{teamData[teamID].name} - Global View</h1>
                <h1>College Number: {teamData[teamID].id}</h1>
            </div>
            


            <div class='teamPageGrid'>
                

                {/* teams profile picture */}
                <div class='box' id='teamProfilePicture'>
                    <img src={teamData[teamID].image} class='smallLogo'></img>
                </div>


                <div id='teamActionButtons'>
                    <button class='heroButton' onClick={handleTeamAction('join')}>Join Team</button>
                    <button class='heroButton' onClick={handleTeamAction('leave')}>Leave Team</button>
                    
                </div>


                <div class='box' id='teamMembers'>
                    <h2>Team Members</h2>
                    {/* divide into three columns/divs for desktop view*/}
                    <div class='horizontalFlex' style={{justifyContent: 'space-around'}}>
                        {/* column 1 */}
                        <TeamMemberCard user={users[0]} />

                        {/* column 2 */}
                        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <TeamMemberCard user={users[1]} />
                            <TeamMemberCard user={users[2]} />
                            <TeamMemberCard user={users[3]} />
                        </div>
                        
                        {/* column 3 */}
                        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <TeamMemberCard user={users[4]} />
                            <TeamMemberCard user={users[5]} />
                            <TeamMemberCard user={users[6]} />
                        </div>
                    </div>
                </div>

                <div class='box' id='teamEvents'>
                    <h2>Next Event</h2>
                    <UpcomingEventComponent 
                            eventTitle="Opening Ceremonies"
                            team1Number={teamData[teamID].name}
                            team2Number={teamData[teamID+1].name}
                            location="123-A"
                            team1Logo="https://placehold.co/100"
                            team2Logo="https://placehold.co/100"
                            isYourTeam1={true}
                    />
                </div>


                <div class='box' id='teamBioInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Team Bio</h2>
                    </div>
                    <div>
                        <p>{teamData[0].bio}</p>
                    </div>
                </div>

                <div class='box' id='teamGallery'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Your Team's Gallery</h2>
                    </div>
                    <div>
                        {/* <GalleryList collegeID={TeamList.id} /> */}
                    </div>
                </div>

                <div class='box' id='teamAccountInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Team Information</h2>
                    </div>
                    <div>
                        <p>Team Name: {teamData[teamID].name}</p>
                        <p>Number of Players: {teamData[teamID].members}</p>
                        <p>College ID: {teamData[teamID].collegeID}</p>
                    </div>
                </div>

                <div class='box' id='teamRegistrationInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Registration Information</h2>
                    </div>
                    <div class='horizontalFlex spaceBetween'>
                        <div>
                            <p>Team Name:</p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>

                        <div>
                            <p>Registration Status</p>
                            <img src={"https://placehold.co/100"} class='smallLogo'></img>
                        </div>
                        
                    </div>
                </div>
               



                {/* <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={teamteamData.id} />

                </div> */}

            </div>

        </div>

    );
}

export default TeamPage;