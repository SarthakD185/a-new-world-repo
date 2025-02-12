import * as React from 'react';
import '../App.css';
import '../assets/css/TeamPage.css';

import TeamList from './college/TeamList';
import GalleryList from './college/GalleryList';
import UpcomingEventComponent from './profile/upcomingEventComponent';
import data from '../assets/data/teams.json';


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
            <div class='horizontalFlex centerButton paddingTop'>
                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                <h1>{data[teamID].name} - Global View</h1>
            </div>

            <div class='pageGrid'>

                    <div id='teamActionButtons'>
                        <button class='heroButton' onClick={handleTeamAction('join')}>Join Team</button>
                        <button class='heroButton' onClick={handleTeamAction('leave')}>Leave Team</button>
                        
                    </div>


                <div class='box' id='accountInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Team Information</h2>
                    </div>
                    <div>
                        <p>Team Name: {data[teamID].name}</p>
                        <p>Number of Players: {data[teamID].members}</p>
                        <p>College ID: {data[teamID].collegeID}</p>
                    </div>
                </div>

                <div class='box' id='registrationInformation'>
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

                <div class='box' id='upcomingEvents'>
                    <h2>Team Members</h2>
                    {/* div to minor three columns/divs*/}
                    <div class='horizontalFlex' style={{justifyContent: 'space-around'}}>
                        {/* column 1 */}
                        {/* <teamMemberCard users={users} /> */}
                        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3>John Doe</h3>
                                <p>Expedition Leader</p>
                            </div>

                        </div>
                        {/* column 2 */}
                        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3 class='noMargin'>Joe Doe</h3>
                                <p>Resource Specialist</p>
                            </div>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3 class='noMargin'>Jane Doe</h3>
                                <p>Technician</p>
                            </div>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3 class='noMargin'>Jane Doe</h3>
                                <p>Weapons Specialist</p>
                            </div>
                        </div>
                        {/* column 3 */}
                        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3 class='noMargin'>Jane Doe</h3>
                                <p>Scientist</p>
                            </div>
                            <div class='box fixedWidthBox'>
                                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                                <h3 class='noMargin'>Jane Doe</h3>
                                <p>Chronicler</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='box' id='teamEvents'>
                    <UpcomingEventComponent 
                            eventTitle="Opening Ceremonies"
                            team1Number={data[teamID].name}
                            team2Number={data[1].name}
                            location="123-A"
                            team1Logo="https://placehold.co/100"
                            team2Logo="https://placehold.co/100"
                            isYourTeam1={true}
                    />
                </div>


                <div class='box' id='bioInformation'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2>Team Bio</h2>
                    </div>
                    <div>
                        <p>{data[0].bio}</p>
                    </div>
                </div>

                <div class='box' id='teamGallery'>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Your Team's Gallery</h2>
                    </div>
                    <div>
                        <GalleryList collegeID={TeamList.id} />
                    </div>
                </div>
               



                {/* <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={data.id} />

                </div> */}

            </div>

        </div>

    );
}

export default TeamPage;