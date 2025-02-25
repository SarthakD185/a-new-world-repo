import { React } from 'react';
import data from '../../assets/data/adminTasks.json';
import { HR } from "flowbite-react";

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function ModeratorUncompletedTasksList(props) {

    //create a new array by filtering the original array

    const filteredData = data.filter((el) => {

        //if no input the return the original

        if (props.input === '') {

            return el;

        }

        //return the item which contains the user input

        else {

            return el.title.toLowerCase().includes(props.input)

        }

    })

    if(filteredData.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Tasks to Display</p>
            </div>
        )

    } else {

        return (

            <div>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                
                {filteredData.map((task) => (
                    <div key={task.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div class='centerButton'>
                                {/* TODO - add button action */}
                                <button class='secondaryButton'>View Details</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default ModeratorUncompletedTasksList;