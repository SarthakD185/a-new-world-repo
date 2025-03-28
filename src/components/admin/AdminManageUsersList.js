import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../App.css';
import '../../assets/css/Landing.css';

function AdminManageUsersList(props) {

    // States
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching users...");  // Log when fetching starts
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/adminFetchAllUsers`); 
                console.log("Fetch response status:", response.status);  // Log the response status
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log("API response data:", data); // Log the fetched data
                setUsers(data); 
            } catch (err) {
                console.error("Error fetching users:", err.message); // Log any errors
                setError(err.message); 
            } finally {
                console.log("Fetch operation completed.");  // Log when fetch finishes
                setLoading(false); 
            }
        };

        fetchUsers();
    }, [props.adminCollegeID]); // Dependency array, refetch when adminCollegeID changes

    if (loading) {
        console.log("Loading users...");  // Log loading state
        return <div className="center">Loading...</div>; // Loading while fetching
    }

    if (error) {
        console.error("Error state:", error);  // Log error state
        return <div className="center">Error: {error}</div>; // Error message
    }

    // Approve User
    const handleApproveUser = async (userID) => {
        console.log("Approving user with ID:", userID);  // Log user ID
        try {
            // Find the user from the list (or fetch their current status if needed)
            const user = users.find(user => user.UserID === userID);
            if (!user) {
                console.error("User not found:", userID);
                alert('User not found.');
                return;
            }
    
            // Check if the user is already confirmed
            if (user.status === 'CONFIRMED') {
                console.log("User is already confirmed, skipping approval.");
                alert('User is already confirmed.');
                return;
            }
    
            // If the user is not confirmed, proceed with approval
            const response = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/approveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,  // Send userId instead of email
                    approve: true,
                }),
            });
    
            console.log("Approve response status:", response.status);  // Log the response status
            if (!response.ok) {
                const errorDetails = await response.text();  // Log the error details
                console.error('Error response:', errorDetails);
                throw new Error('Failed to approve user');
            }
    
            setUsers(users.filter(user => user.UserID !== userID)); // Remove the user by userID
            console.log("User approved successfully:", userID); // Log successful approval
    
            alert("User approved successfully!");
        } catch (err) {
            console.error('Error approving user:', err); // Log any error
            alert('Failed to approve user');
        }
    };

    // Delete User
    const handleDeleteUser = async (userID) => {
        console.log("Deleting user with ID:", userID);  // Log user ID
        try {
            const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/deleteUser?userId=${userID}`, {
                method: 'DELETE',
            });

            console.log("Delete response status:", response.status);  // Log the response status
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.UserID !== userID)); // Update the user list after deletion
            console.log("User deleted successfully:", userID);  // Log successful deletion

            alert("User deleted successfully!");
        } catch (err) {
            console.error('Error deleting user:', err);  // Log any error
            alert('Failed to delete user');
        }
    };

    // Filter Users
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            console.log("No filter applied.");  // Log if no filter
            return el;
        } else {
            console.log("Applying filter:", props.input);  // Log the filter being applied
            return (
                el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
            );
        }
    });

    if (filteredData.length === 0) {
        console.log("No users to display after filtering.");  // Log if no users match filter
        return (
            <div className="fullHeight">
                <p className="center">No Users to Display</p>
            </div>
        );
    } else {
        console.log("Displaying filtered users:", filteredData.length);  // Log number of filtered users
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
