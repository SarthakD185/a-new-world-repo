import { React } from 'react';
import data from '../../assets/data/colleges.json';
import { HR } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

function TournamentList(props) {
    //https://dev.to/salehmubashar/search-bar-in-react-js-545l
    const navigate = useNavigate();

    function handleClick(tournamentInfo) {
        navigate('/individualTournament', { state:{id: tournamentInfo.id, name: tournamentInfo.name, image: tournamentInfo.image} });
    }

    //create a new array by filtering the original array

    const filteredData = data.filter((el) => {

        //if no input the return the original

        if (props.input === '') {

            return el;

        }

        //return the item which contains the user input

        else {

            return el.name.toLowerCase().includes(props.input)

        }

    })

    if(filteredData.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Tournaments to Display</p>
            </div>
        )

    } else {

        return (

            <div>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                
                {filteredData.map((tournament) => (
                    <div key={tournament.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div class='horizontalFlex'>
                                <img src={require(`../../assets/images/${tournament.image}`)} class='smallLogo' alt={`${tournament.name} logo`}></img>
                                <h3 class='listTitle'>{tournament.name}</h3>
                            </div>
                            <div class='centerButton smallMobileButton'>
                                <button class='standardButton' onClick={()=>handleClick(tournament)}>View Tournament</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default TournamentList;