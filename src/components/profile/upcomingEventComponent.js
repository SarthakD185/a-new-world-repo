import { React } from 'react';
import '../../App.css';
import '../../assets/css/ProfilePage.css';

function UpcomingEventComponent({ 
    eventTitle, 
    team1Number, 
    team2Number, 
    location, 
    team1Logo, 
    team2Logo,
    isYourTeam1 // boolean to indicate if "YOUR TEAM" label should be on team1 or team2
}) {
    return (
        <>
            <div className='horizontalFlex spaceBetween'>
                <div>   
                <h3>{eventTitle}</h3>
                    <h3>
                        {isYourTeam1 ? "YOUR TEAM " : ""}
                        Team {team1Number}
                        &nbsp;vs&nbsp;
                        {!isYourTeam1 ? " YOUR TEAM " : ""}
                        Team {team2Number}
                    </h3>
                    <p>Location: {location}</p>
                </div>
                <div className='horizontalFlex spaceBetween'>
                    <img src={"https://placehold.co/100"} alt={`Team ${team1Number} logo`} className="smallLogo" />
                    <img src={"https://placehold.co/100"} alt={`Team ${team2Number} logo`} className="smallLogo" />
                </div>
        
            </div>
            <hr></hr>
        </>

    )
}

export default UpcomingEventComponent;