import { React } from 'react';
import data from '../../assets/data/colleges.json';
import { HR } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function TournamentList(props) {

    const navigate = useNavigate();

    function handleClick(collegeInfo) {
        navigate('/individualTournament', { state:{id: collegeInfo.id, name: collegeInfo.name, image: collegeInfo.image} });
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
                
                {filteredData.map((college) => (
                    <div key={college.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div class='horizontalFlex'>
                                <img src={require(`../../assets/images/${college.image}`)} class='smallLogo'></img>
                                <h3>{college.name}</h3>
                            </div>
                            <div class='centerButton'>
                                <button class='standardButton' onClick={()=>handleClick(college)}>View Tournament</button>
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