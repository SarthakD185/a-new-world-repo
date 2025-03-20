import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';

function TeamMemberCard({ 
    user,
    className
 }) {
    

    return (
        <>
            <div class={`box teamMemberBox ${className}`}>
                <img src={"https://placehold.co/150"} class=''></img>
                <div style={{padding: '10px', textAlign: 'left'}}>
                    <h4>{user.name}</h4>
                    <p>{user.teamRole}</p>
                </div>
            </div>

        </>
    );
}

export default TeamMemberCard;


