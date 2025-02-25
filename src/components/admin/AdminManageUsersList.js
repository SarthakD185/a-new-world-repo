import { React } from 'react';
import data from '../../assets/data/users.json';
import { HR } from "flowbite-react";

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function AdminManageUsersList(props) {

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
                <p class='center'>No Users to Display</p>
            </div>
        )

    } else {

        return (

            <div style={{height: '412px', overflow: 'scroll'}}> 
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                
                {filteredData.map((users) => (
                    <div key={users.id}>
                        <div class='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{users.name}</h3>
                                <p>{users.teamRole}</p>
                            </div>
                            <div class='centerButton'>
                                {/* TODO - add button action */}
                                <button class='secondaryButton'>View Profile</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default AdminManageUsersList;