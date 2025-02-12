import * as React from 'react';
import '../../App.css';
import '../../assets/css/TeamPage.css';

function TeamMemberCard({ user }) {


    return (
        <>
            <div class='box fixedWidthBox'>
                <img src={"https://placehold.co/150"} class='smallLogo'></img>
                <div style={{padding: '10px', textAlign: 'left'}}>
                    <h3>{user.name}</h3>
                    <p>{user.teamRole}</p>
                </div>
            </div>

        </>
    );
}

export default TeamMemberCard;


