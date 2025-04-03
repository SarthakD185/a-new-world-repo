import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';
import TeamMemberCard from './TeamMemberCard';

// This is an arrangement of the Team mambers for the Mobile View
// The team members panel is made in two versions (DESKTOP and MOBILE) because the arrangement for the different screen sizes requires different css different HTML structures to work effectivly. The CSS for each component styles when it is applicable and hides when it is not the correct screen size.

function TeamMembersPanelMOBILE(props) {

    const teamMembers = props.teamMembers;

    return (
        <>
            <h2>Team Members</h2>
            <div className='horizontalFlex' style={{justifyContent: 'space-around', height: '250px', overflow: 'scroll' }}>
                {teamMembers[0] ? <TeamMemberCard user={teamMembers[0]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[1] ? <TeamMemberCard user={teamMembers[1]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[2] ? <TeamMemberCard user={teamMembers[2]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[3] ? <TeamMemberCard user={teamMembers[3]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[4] ? <TeamMemberCard user={teamMembers[4]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[5] ? <TeamMemberCard user={teamMembers[5]} className='teamMemberMobileCard' /> : ""}
                {teamMembers[6] ? <TeamMemberCard user={teamMembers[6]} className='teamMemberMobileCard' /> : ""}
            </div>

        </>
    );
}

export default TeamMembersPanelMOBILE;


