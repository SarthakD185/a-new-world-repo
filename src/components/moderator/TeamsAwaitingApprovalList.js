import { React } from 'react';
import data from '../../assets/data/adminTasks.json';
import { HR } from "flowbite-react";

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function TeamsAwaitingApprovalList(props) {

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

            <div className='overflowList'>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                
                {filteredData.map((task) => (
                    <div key={task.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>

                            {/* Approve and Delete Buttons */}
                            <div className="horizontalFlex approveDeleteButtons">
                                {/* Approve Button */}
                                <div className="centerButton">
                                    <button
                                        className="approveButton"
                                        // onClick={} // Trigger approval on button click
                                    >
                                        <span style={{ color: 'green', fontSize: '20px' }}>Approve</span> {/* Red X button */}
                                    </button>
                                </div>

                                {/* Delete Button */}
                                <div className="centerButton">
                                    <button
                                        className="deleteButton"
                                        // onClick={} // Trigger delete on button click
                                    >
                                        <span style={{ color: 'red', fontSize: '20px' }}>X Deny</span> {/* Red X button */}
                                        </button>
                                </div>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default TeamsAwaitingApprovalList;