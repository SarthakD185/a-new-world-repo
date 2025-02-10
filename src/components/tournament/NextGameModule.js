import { React } from 'react';
import games from '../../assets/data/games.json';
import '../../assets/css/IndividualTournament.css';
import '../../App.css';
import TeamsPlaying from './TeamsPlaying';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function NextGameModule(props) {

    //create a new array by filtering the original array

    const filteredGames = games.filter((el) => {

        if((el.collegeID === props.collegeID) && (el.status === "waiting")) {

            return el;

        }

    })

    const formatOptions = {
        timeStyle: "short"
    };

    if(filteredGames.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Upcoming Game</p>
            </div>
        )

    } else if(filteredGames.length > 1) {

        let nextGame = filteredGames[0]
        let nextDate = new Date(filteredGames[0].startTime)

        for(let i = 1; i < filteredGames.length; i++){
            
            let testDate = new Date(filteredGames[i].startTime)

            if(testDate < nextDate){
                nextGame = filteredGames[i]
                nextDate = new Date(filteredGames[i].startTime)
            }
        }

        return (

            <div key={nextGame.id}>
                <div class='center'>
                    <TeamsPlaying game={nextGame} />
                    <p style={{marginBottom: "8px"}}>Location: {nextGame.location}</p>
                    <p>Start Time: {Intl.DateTimeFormat('en-US', formatOptions).format(new Date(nextGame.startTime))}</p>
                </div>
            </div>

        )
        

    } else {

        return (

            <div>
                        
                {filteredGames.map((game) => (
                    <div key={game.id}>
                        <div class='center'>
                            <TeamsPlaying game={game} />
                            <p style={{marginBottom: "8px"}}>Location: {game.location}</p>
                            <p>Start Time: {Intl.DateTimeFormat('en-US', formatOptions).format(new Date(game.startTime))}</p>
                        </div>
                    </div>
                ))}
            </div>

        )
    }

}



export default NextGameModule;