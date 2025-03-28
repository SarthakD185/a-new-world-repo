import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../App.css';
import '../../assets/css/Landing.css';

function AdminManageUsersList(props) {

    //states
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/adminFetchAllUsers`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log("API response data:", data); //logs
                setUsers(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers();
    }, [props.adminCollegeID]); //Dependency array, refetch when adminCollegeID changes

    if (loading) {
        return <div className="center">Loading...</div>; //loading while fetching
    }

    if (error) {
        return <div className="center">Error: {error}</div>; //error
    }

    //approve
    const handleApproveUser = async (userID) => {
        try {
            const response = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/approveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                    approve: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve user');
            }

            //make them disappear after
            setUsers(users.filter(user => user.UserID !== userID));

            //Success
            alert("User approved successfully!");
        } catch (err) {
            console.error('Error approving user:', err);
            alert('Failed to approve user');
        }
    };

    //Delete
    const handleDeleteUser = async (userID) => {
        try {
            const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/deleteUser?userId=${userID}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.UserID !== userID)); //Update the user list after deletion
            alert("User deleted successfully!");
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    //Filter
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return (
                el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
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
            <div className='overflowList'>
                <HR />
                {filteredData.map((user) => (
                    <div key={user.UserID}>
                        <div className="horizontalFlex spaceBetween">
                            <div>
                                <h3>{user.username}</h3>
                                <p>{user.teamRole || 'No Role Assigned'}</p>
                            </div>

                            {/* Approve and Delete Buttons */}
                            <div className="horizontalFlex approveDeleteButtons">
                                <div className="centerButton">
                                    <button
                                        className="approveButton"
                                        onClick={() => handleApproveUser(user.UserID)} // Approve action
                                    >
                                        <span style={{ color: 'green', fontSize: '20px' }}>Approve</span>
                                    </button>
                                </div>

                                <div className="centerButton">
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteUser(user.UserID)} // Trigger delete on button click
                                    >
                                        <span style={{ color: 'red', fontSize: '20px' }}>X Deny</span>
                                    </button>
                                </div>
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
