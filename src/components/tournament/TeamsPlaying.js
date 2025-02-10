import { React } from 'react';
import '../../assets/css/IndividualTournament.css';
import '../../App.css';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function TeamsPlaying(props) {

    if((props.game.team1 === null) && (props.game.team2 === null)){

        return(
            <div style={{margin: "12px 0px 12px 0px"}}>
                <h3 class='noMargin'>Undecided</h3>
                <h3 class='noMargin'> vs </h3>
                <h3 class='noMargin'>Undecided</h3>
            </div>
        )

    } else if((props.game.team1 === null) && (props.game.team2 != null)) {

        return (

            <div style={{margin: "12px 0px 12px 0px"}}>
                <h3 class='noMargin'>Undecided</h3>
                <h3 class='noMargin'> vs </h3>
                <h3 class='noMargin'>{props.game.team2}</h3>
            </div>

        )

    } else if((props.game.team1 != null) && (props.game.team2 === null)) {

        return (

            <div style={{margin: "12px 0px 12px 0px"}}>
                <h3 class='noMargin'>{props.game.team1}</h3>
                <h3 class='noMargin'> vs </h3>
                <h3 class='noMargin'>Undecided</h3>
            </div>

        )
    } else {
        return (

            <div style={{margin: "12px 0px 12px 0px"}}>
                <h3 class='noMargin'>{props.game.team1}</h3>
                <h3 class='noMargin'> vs </h3>
                <h3 class='noMargin'>{props.game.team2}</h3>
            </div>

        )
    }

}



export default TeamsPlaying;