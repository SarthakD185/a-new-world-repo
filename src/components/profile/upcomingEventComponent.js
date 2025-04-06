import { React } from 'react';
import '../../App.css';
import '../../assets/css/ProfilePage.css';
import { HR } from "flowbite-react";

function UpcomingEventComponent({games}) {

    if(!games || games.length === 0){

        return (
            <>
                <div className='horizontalFlex spaceBetween'> 
                    <h3>No Upcoming Events</h3>
                </div>
            </>
        )

    } else if(games.length > 1) {

        return (
            <>
                {games.map((game) => (
                    <div key={game.MatchID}>
                        <h3>{game.teamOneName ? game.teamOneName : "Unknown"} vs {game.teamTwoName ? game.teamTwoName : "Unknown"}</h3>
                        <p>Location: {game.Location ? game.Location : "N/A"}</p>
                        <div className="horizontalFlex spaceBetween">
                            <p style={{marginBottom: "0px"}}>Date: {game.Date ? game.Date.split(" ")[0] : "N/A"}</p>
                            <p>Time: {game.Date ? game.Date.split(" ")[1] : "N/A"}</p>
                        </div>
                        <HR />
                    </div>
                ))}
            </>
    
        )

    } else {

        return (
            <>
                <div> 
                    <h3>{games[0].teamOneName ? games[0].teamOneName : "Unknown"} vs {games[0].teamTwoName ? games[0].teamTwoName : "Unknown"}</h3>
                    <p>Location: {games[0].Location ? games[0].Location : "N/A"}</p>
                    <div className="horizontalFlex spaceBetween">
                        <p style={{marginBottom: "0px"}}>Date: {games[0].Date ? games[0].Date.split(" ")[0] : "N/A"}</p>
                        <p>Time: {games[0].Date ? games[0].Date.split(" ")[1] : "N/A"}</p>
                    </div>
                </div>
            </>
    
        )

    }
}

export default UpcomingEventComponent;