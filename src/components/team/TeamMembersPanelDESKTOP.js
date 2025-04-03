import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';
import TeamMemberCard from './TeamMemberCard';
import users from '../../assets/data/users.json';

// This is an arrangement of the Team mambers for the Desktop View
// The team members panel is made in two versions (DESKTOP and MOBILE) because the arrangement for the different screen sizes requires different css different HTML structures to work effectivly. The CSS for each component styles when it is applicable and hides when it is not the correct screen size.≈

function TeamMembersPanelDESKTOP() {
    

    return (
        <>
           <h2>Team Members</h2>
                    {/* divide into three columns/divs for desktop view*/}
                    <div className='horizontalFlex' style={{justifyContent: 'space-around'}}>
                        {/* column 1 */}
                        <TeamMemberCard user={users[0]} />

                        {/* column 2 */}
                        <div className='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <TeamMemberCard user={users[1]} />
                            <TeamMemberCard user={users[2]} />
                            <TeamMemberCard user={users[3]} />
                        </div>
                        
                        {/* column 3 */}
                        <div className='verticalFlex' style={{justifyContent: 'space-around'}}>
                            <TeamMemberCard user={users[4]} />
                            <TeamMemberCard user={users[5]} />
                            <TeamMemberCard user={users[6]} />
                        </div>
                    </div>

        </>
    );
}

export default TeamMembersPanelDESKTOP;


