import { React } from 'react';
import '../../App.css';
import '../../assets/css/ProfilePage.css';

function UpcomingEventComponent({nextGame}) {

    if(!nextGame){

        return (
            <>
                <div className='horizontalFlex spaceBetween'> 
                    <h3>No Upcoming Events</h3>
                </div>
            </>
        )

    } else {

        return (
            <>
                <div> 
                    <h3>{nextGame.teamOneName ? nextGame.teamOneName : "Unknown"} vs {nextGame.teamTwoName ? nextGame.teamTwoName : "Unknown"}</h3>
                    <p>Location: {nextGame.Location ? nextGame.Location : "N/A"}</p>
                    <div className="horizontalFlex spaceBetween">
                        <p style={{marginBottom: "0px"}}>Date: {nextGame.Date ? nextGame.Date.split(" ")[0] : "N/A"}</p>
                        <p>Time: {nextGame.Date ? nextGame.Date.split(" ")[1] : "N/A"}</p>
                    </div>
                </div>
            </>
    
        )

    }
}

export default UpcomingEventComponent;