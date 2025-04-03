import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';

function TeamMemberCard({ user, className }) {

    return (
        <>
            <div className={`box teamMemberBox ${className}`}>
                <img src={"https://placehold.co/150"}></img>
                <div style={{padding: '10px', textAlign: 'left'}}>
                    <h4>{user.firstname} {user.lastname}</h4>
                    <p>{user.bio ? user.bio : "No bio available."}</p>
                </div>
            </div>

        </>
    );
}

export default TeamMemberCard;


