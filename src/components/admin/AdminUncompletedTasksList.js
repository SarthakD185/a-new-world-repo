import { React } from 'react';
import data from '../../assets/data/adminTasks.json';
import { HR } from "flowbite-react";

// https://dev.to/salehmubashar/search-bar-in-react-js-545l
function AdminUncompletedTasksList(props) {
    // Create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        // If no input, return the original
        if (props.input === '') {
            return el;
        }
        // Return the item which contains the user input
        else {
            return el.title.toLowerCase().includes(props.input);
        }
    });

    if (filteredData.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Tasks to Display</p>
            </div>
        );
    } else {
        return (
            <div>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                {filteredData.map((task) => (
                    <div key={task.id}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className='centerButton'>
                                {/* TODO - add button action */}
                                <button className='secondaryButton'>Send Reminder</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default AdminUncompletedTasksList;
