import { React } from 'react';
import data from '../../assets/data/users.json';
import { HR } from "flowbite-react";

// https://dev.to/salehmubashar/search-bar-in-react-js-545l
function AdminManageUsersList(props) {

    // Create a new array by filtering the original array
    const filteredData = data.filter((el) => {

        // If no input, return the original
        if (props.input === '') {
            return el;
        }

        // Return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input);
        }

    });

    if (filteredData.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Users to Display</p>
            </div>
        );
    } else {
        return (
            <div style={{ height: '412px', overflow: 'scroll' }}>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />

                {filteredData.map((users) => (
                    <div key={users.id}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{users.name}</h3>
                                <p>{users.teamRole}</p>
                            </div>
                            <div className='centerButton'>
                                {/* TODO - add button action */}
                                <button className='secondaryButton'>View Profile</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default AdminManageUsersList;
