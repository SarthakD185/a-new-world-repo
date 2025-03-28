import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";

function UsersAwaitingApprovalList(props) {
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
    }, [props.moderatorCollegeID]);

    if (loading) {
        return <div className="center">Loading...</div>;
    }

    if (error) {
        return <div className="center">Error: {error}</div>;
    }

    // Approve function
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

            //Update the UI after approval: either remove or mark the user as approved
            setUsers(users.filter(user => user.UserID !== userID));

            //Success message
            alert("User approved successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error approving user:', err);
            alert('Failed to approve user');
        }
    };

    // Delete function
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
            window.location.reload();
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    // Filtering users
    // eslint-disable-next-line
    const filteredData = users.filter((el) => {
        if(el.Approved === 0) {
            if (props.input === '') {
                return el;
            } else {
                return (
                    el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                    el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                    el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                );
            }
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
                                {/* Approve Button */}
                                <div className="centerButton">
                                    <button
                                        className="approveButton"
                                        onClick={() => handleApproveUser(user.UserID)} // Approve action
                                    >
                                        <span style={{ color: 'green', fontSize: '20px' }}>Approve</span>
                                    </button>
                                </div>

                                {/* Delete Button */}
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

export default UsersAwaitingApprovalList;
