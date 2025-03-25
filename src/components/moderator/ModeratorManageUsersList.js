import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";

function ModeratorManageUsersList(props) {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/${props.moderatorCollegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log("API response data:", data); //log
                setUsers(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers();
    }, [props.moderatorCollegeID]);//refetch 

    
    if (loading) {
        return <div className="center">Loading...</div>;
    }

    if (error) {
        return <div className="center">Error: {error}</div>;
    }

    //delete function
    const handleDeleteUser = async (userID) => {
        try {
            //query
            const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/deleteUser?userId=${userID}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            //update display list
            setUsers(users.filter(user => user.UserID !== userID));

            //success or failure message
            alert("User deleted successfully!");
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    //If there's no input, display all users
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            return true; 
        } else {
            return (
                el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                el.lastname.toLowerCase().includes(props.input.toLowerCase()) //filter
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
                                <button
                                    className="deleteButton"
                                    onClick={() => handleDeleteUser(user.UserID)} // Trigger delete on button click
                                >
                                    <span style={{ color: 'red', fontSize: '20px' }}>X</span> {/* Red X button */}
                                </button>
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
