import { React } from 'react';
import data from '../../assets/data/teams.json';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualCollege.css';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function TeamList(props) {

    //create a new array by filtering the original array

    const filteredData = data.filter((el) => {

        if(el.collegeID == props.collegeID) {

            //if no input the return the original

            if (props.input === '') {

                return el;

            }

            //return the item which contains the user input

            else {

                return el.name.toLowerCase().includes(props.input)

            }

        }

    })

    if(filteredData.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Teams to Display</p>
            </div>
        )

    } else {

        return (

            <div>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />

                {filteredData.map((team) => (
                    <div key={team.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div class='horizontalFlex'>
                                <img src={require(`../../assets/images/${team.image}`)} class='smallLogo rounded'></img>
                                <div>
                                    <h3 class='smallBottomMargin'>{team.name}</h3>
                                    <p class='shortBio'>{team.bio}</p>
                                </div>
                            </div>
                            <div class='centerButton'>
                                {/* TODO - add button action */}
                                <button class='standardButton'>Join Team</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default TeamList;