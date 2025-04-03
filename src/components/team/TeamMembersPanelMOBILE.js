import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';
import TeamMemberCard from './TeamMemberCard';
import users from '../../assets/data/users.json';

// This is an arrangement of the Team mambers for the Mobile View
// The team members panel is made in two versions (DESKTOP and MOBILE) because the arrangement for the different screen sizes requires different css different HTML structures to work effectivly. The CSS for each component styles when it is applicable and hides when it is not the correct screen size.

function TeamMembersPanelMOBILE() {
    

    return (
        <>
            <h2>Team Members</h2>
            <div className='horizontalFlex' style={{justifyContent: 'space-around', height: '250px', overflow: 'scroll' }}>
                <TeamMemberCard user={users[0]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[1]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[2]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[3]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[4]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[5]} className='teamMemberMobileCard' />
                <TeamMemberCard user={users[6]} className='teamMemberMobileCard' />
            </div>

        </>
    );
}

export default TeamMembersPanelMOBILE;


