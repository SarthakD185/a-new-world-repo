import { React } from 'react';
import games from '../../assets/data/games.json';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function CurrentGameList(props) {

    //create a new array by filtering the original array

    const filteredGames = games.filter((el) => {

        if((el.collegeID === props.collegeID) && (el.status === "active")) {

            return el;

        }

    })

    const formatOptions = {
        timeStyle: "short"
    };

    if(filteredGames.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Games to Display</p>
            </div>
        )

    } else {

        return (

            <div>
                        {/* https://flowbite-react.com/docs/typography/hr */}
                        <HR />
                        
                        {filteredGames.map((game) => (
                            <div key={game.id}>
                                <div class='horizontalFlex spaceBetween'>
                                    <div>
                                        <h4 class='noMargin'>{game.team1} vs {game.team2}</h4>
                                        <p class='smallFont'>Location: {game.location}</p>
                                    </div>

                                    <div>
                                        <p class='smallFont lightFont'>Start Time: {Intl.DateTimeFormat('en-US', formatOptions).format(new Date(game.startTime))}</p>
                                    </div>
                                </div>
                                <HR />
                            </div>
                        ))}
                    </div>

        )
    }

}



export default CurrentGameList;