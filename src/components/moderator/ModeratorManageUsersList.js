import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";

function ModeratorManageUsersList(props) {
    const [users, setUsers] = useState([]); // state to store fetched users
    const [loading, setLoading] = useState(true); // state to manage loading state
    const [error, setError] = useState(null); // state to manage errors

    // Fetch users when the component mounts or when the moderatorCollegeID changes
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/${props.moderatorCollegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log("API response data:", data); // Log data to check the response
                setUsers(data); // store the fetched data in state
            } catch (err) {
                setError(err.message); // set error state
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchUsers();
    }, [props.moderatorCollegeID]); // refetch if the college ID changes 

    // Handle loading, error, and data rendering
    if (loading) {
        return <div className="center">Loading...</div>;
    }

    if (error) {
        return <div className="center">Error: {error}</div>;
    }

    // If there's no input, display all users
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            return true; // Display all users
        } else {
            return (
                el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                el.lastname.toLowerCase().includes(props.input.toLowerCase()) // Filter by username, first name, or last name
            );
        }
    });

    if (filteredData.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Users to Display</p>
            </div>
        );
    } else {
        return (
            <div>
                <HR />
                {filteredData.map((user) => (
                    <div key={user.UserID}>
                        <div className="horizontalFlex spaceBetween">
                            <div>
                                <h3>{user.username}</h3>
                                <p>{user.teamRole || 'No Role Assigned'}</p> {/* Adjust if teamRole is available */}
                            </div>
                            <div className="centerButton">
                                <button className="secondaryButton">View Profile</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default ModeratorManageUsersList;
