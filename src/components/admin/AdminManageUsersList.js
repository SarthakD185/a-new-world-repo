import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../App.css';
import '../../assets/css/Landing.css';
import Popup from 'reactjs-popup';

function AdminManageUsersList(props) {

    // States
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [colleges, setColleges] = useState([]);

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

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                console.log("Fetching colleges...");  // Log when fetching starts
                const response = await fetch(`https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/colleges`); 
                console.log("Fetch response status:", response.status);  // Log the response status
                if (!response.ok) {
                    throw new Error('Failed to fetch colleges');
                }
                const data = await response.json();
                console.log("API response data:", data); // Log the fetched data
                setColleges(data); 
            } catch (err) {
                console.error("Error fetching colleges:", err.message); // Log any errors
                setError(err.message); 
            } finally {
                console.log("Fetch operation completed.");  // Log when fetch finishes
                setLoading(false); 
            }
        };

        fetchColleges();
    }, []); // Dependency array, refetch when adminCollegeID changes

    if (loading) {
        console.log("Loading users...");  // Log loading state
        return <div className="center">Loading...</div>; // Loading while fetching
    }

    if (error) {
        console.error("Error state:", error);  // Log error state
        return <div className="center">Error: {error}</div>; // Error message
    }

    // Edit function
    const handleEditUser = async (userID) => {
        try {

            const response = await fetch('https://sstzeckd16.execute-api.us-east-1.amazonaws.com/prod/editUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                    edit: true,
                    firstname: document.getElementById('manageUserProfileFirstName').value,
                    lastname: document.getElementById('manageUserProfileLastName').value,
                    username: document.getElementById('manageUserProfileUsername').value,
                    college: document.getElementById('manageUserProfileCollege').value,
                    role: document.getElementById('manageUserProfileRole').value,
                    bio: document.getElementById('manageUserProfileBioInput').value,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit user information');
            }

            //Success message
            alert("User information edited successfully!");
        } catch (err) {
            console.error('Error editing user information:', err);
            alert('Failed to edit user information');
        }
    };

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
        if(props.cFilter[0] === "All Colleges"){

            if (props.input === '') {

                console.log("No search filter applied.");  // Log if no filter

                if(props.pFilter === true && el.role === "Player"){
                    return el;
                } else if(props.marFilter === true && el.role === "Marketer"){
                    return el;
                } else if(props.modFilter === true && el.role === "Moderator"){
                    return el;
                } else if(props.aFilter === true && el.role === "Admin"){
                    return el;
                }
            }

            // Return the item which contains the user input
            else {

                console.log("Applying filter:", props.input);  // Log the filter being applied

                if(props.pFilter === true && el.role === "Player"){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.marFilter === true && el.role === "Marketer"){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.modFilter === true && el.role === "Moderator"){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.aFilter === true && el.role === "Admin"){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                }
            }
        } else {

            if (props.input === '') {

                console.log("No search filter applied.");  // Log if no filter

                if(props.pFilter === true && el.role === "Player" && el.college === props.cFilter[0]){
                    return el;
                } else if(props.marFilter === true && el.role === "Marketer" && el.college === props.cFilter[0]){
                    return el;
                } else if(props.modFilter === true && el.role === "Moderator" && el.college === props.cFilter[0]){
                    return el;
                } else if(props.aFilter === true && el.role === "Admin" && el.college === props.cFilter[0]){
                    return el;
                }
            }

            // Return the item which contains the user input
            else {

                console.log("Applying filter:", props.input);  // Log the filter being applied

                if(props.pFilter === true && el.role === "Player" && el.college === props.cFilter[0]){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.marFilter === true && el.role === "Marketer" && el.college === props.cFilter[0]){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.modFilter === true && el.role === "Moderator" && el.college === props.cFilter[0]){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                } else if(props.aFilter === true && el.role === "Admin" && el.college === props.cFilter[0]){
                    return (
                        el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                        el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
                    );
                }
            }
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
                                <p>{user.college || 'No College Assigned'}</p>
                            </div>

                            {/* Approve and Delete Buttons */}
                            <div className="horizontalFlex approveDeleteButtons">
                                <div className='centerButton'>
                                    <Popup trigger=
                                        {<button className='secondaryButton'>View Profile</button>} 
                                        modal nested>
                                        {
                                            close => (
                                                <div className='modal popup'>
                                                    <div className='popupContent'>
    
                                                        <h1 className='center'>Manage User</h1>
    
                                                        <form>
                                                            <div className='twoColumnGrid'>
                                                                
                                                                {/*
                                                                <div id='manageUserProfileImage' class='horizontalFlex' style={{marginBottom: '24px'}}>
                                                                    <img src={require(`../../assets/images/${user.profileImage}`)} class='smallLogo' alt={`${user.name} logo`}></img>
                                                                    // TODO - add button action to delete user profile image
                                                                    <button className='redButton'>Delete Image</button>
                                                                </div>
                                                                */}
                                                                
                                                                <div id='manageUserProfileFirstNameDiv'>
                                                                    <label htmlFor="manageUserProfileFirstName">First Name: </label>
                                                                    <input type="text" id="manageUserProfileFirstName" name="manageUserProfileFirstName" style={{marginBottom: '24px'}} defaultValue={user.firstname}/>
                                                                </div>

                                                                <div id='manageUserProfileLastNameDiv'>
                                                                    <label htmlFor="manageUserProfileLastName">Last Name: </label>
                                                                    <input type="text" id="manageUserProfileLastName" name="manageUserProfileLastName" style={{marginBottom: '24px'}} defaultValue={user.lastname}/>
                                                                </div>

                                                                <div id='manageUserProfileUsernameDiv'>
                                                                    <label htmlFor="manageUserProfileUsername">Username: </label>
                                                                    <input type="text" id="manageUserProfileUsername" name="manageUserProfileUsername" style={{marginBottom: '24px'}} defaultValue={user.username}/>
                                                                </div>

                                                                <div id='manageUserProfileCollegeDiv'>
                                                                    <label htmlFor="manageUserProfileCollege">College: </label>

                                                                    <select name="manageUserProfileCollege" id="manageUserProfileCollege" defaultValue={user.college ? user.college : 'No College Selected'}>
                                                                        <option value="No College Selected" id={'collegeEditUserNoCollegeSelected'}>No College Selected</option>
                                                                        {colleges.map((college) => (
                                                                            <option value={college.COLLEGE_NAME} id={'collegeEditUser' + college.CollegeID}>{college.COLLEGE_NAME}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
    
                                                                <div id='manageUserProfileRoleDiv' style={{marginBottom: '24px'}}>
                                                                    <label htmlFor="manageUserProfileRole">Role:</label>
    
                                                                    <select name="manageUserProfileRole" id="manageUserProfileRole" defaultValue={user.role}>
                                                                        <option value="Player">Player</option>
                                                                        <option value="Moderator">Moderator</option>
                                                                        <option value="Marketer">Marketer</option>
                                                                        <option value="Admin">Admin</option>
                                                                    </select>
                                                                </div>
    
                                                                <label htmlFor="manageUserProfileBioInput" id='manageUserProfileBioLabel'>Bio: </label>
                                                                <input type="text" id="manageUserProfileBioInput" name="manageUserProfileBioInput" style={{marginBottom: '24px'}} defaultValue={user.bio ? user.bio : ''} className='messageInputField'/>
    
                                                            </div>
    
                                                            <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                                                {/* TODO - add button action to save user profile changes */}
                                                                <button className='redButton fullWidth' onClick=
                                                                    {() => close()}>
                                                                        Close
                                                                </button>
    
                                                                <button className='standardButton fullWidth' onClick=
                                                                    {() => handleEditUser(user.UserID)}>
                                                                        Save
                                                                </button>
    
    
                                                            </div>
                                                        </form>
    
                                                    </div>
    
                                                </div>
                                            )
                                        }
                                    </Popup>
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
