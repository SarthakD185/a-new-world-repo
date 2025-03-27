import { React } from 'react';
import data from '../../assets/data/users.json';
import { HR } from "flowbite-react";
import Popup from 'reactjs-popup';
import '../../App.css';
import '../../assets/css/Landing.css';

// https://dev.to/salehmubashar/search-bar-in-react-js-545l
function AdminManageUsersList(props) {

    // Create a new array by filtering the original array
    // eslint-disable-next-line
    const filteredData = data.filter((el) => {

        // If no input, return the original

        if(props.cFilter[0] === "All Colleges"){
            if (props.input === '') {
                if(props.tMFilter === true && el.userType === "Team Member"){
                    return el;
                } else if(props.tCFilter === true && el.userType === "Team Captain"){
                    return el;
                } else if(props.marFilter === true && el.userType === "Marketer"){
                    return el;
                } else if(props.modFilter === true && el.userType === "Moderator"){
                    return el;
                } else if(props.aFilter === true && el.userType === "Admin"){
                    return el;
                }
            }

            // Return the item which contains the user input
            else {
                if(props.tMFilter === true && el.userType === "Team Member"){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.tCFilter === true && el.userType === "Team Captain"){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.marFilter === true && el.userType === "Marketer"){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.modFilter === true && el.userType === "Moderator"){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.aFilter === true && el.userType === "Admin"){
                    return el.name.toLowerCase().includes(props.input);
                }
            }
        } else {
            if (props.input === '') {
                if(props.tMFilter === true && el.userType === "Team Member" && el.collegeID === props.cFilter[1]){
                    return el;
                } else if(props.tCFilter === true && el.userType === "Team Captain" && el.collegeID === props.cFilter[1]){
                    return el;
                } else if(props.marFilter === true && el.userType === "Marketer" && el.collegeID === props.cFilter[1]){
                    return el;
                } else if(props.modFilter === true && el.userType === "Moderator" && el.collegeID === props.cFilter[1]){
                    return el;
                } else if(props.aFilter === true && el.userType === "Admin" && el.collegeID === props.cFilter[1]){
                    return el;
                }
            }

            // Return the item which contains the user input
            else {
                if(props.tMFilter === true && el.userType === "Team Member" && el.collegeID === props.cFilter[1]){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.tCFilter === true && el.userType === "Team Captain" && el.collegeID === props.cFilter[1]){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.marFilter === true && el.userType === "Marketer" && el.collegeID === props.cFilter[1]){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.modFilter === true && el.userType === "Moderator" && el.collegeID === props.cFilter[1]){
                    return el.name.toLowerCase().includes(props.input);
                } else if(props.aFilter === true && el.userType === "Admin" && el.collegeID === props.cFilter[1]){
                    return el.name.toLowerCase().includes(props.input);
                }
            }
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
                                <Popup trigger=
                                    {<button className='secondaryButton'>View Profile</button>} 
                                    modal nested>
                                    {
                                        close => (
                                            <div className='modal popup'>
                                                <div className='popupContent'>

                                                    <h1 class='center'>Manage User</h1>

                                                    <form>
                                                        <div class='twoColumnGrid'>
                                                            
                                                            <div id='manageUserProfileImage' class='horizontalFlex' style={{marginBottom: '24px'}}>
                                                                <img src={require(`../../assets/images/${users.profileImage}`)} class='smallLogo' alt={`${users.name} logo`}></img>
                                                                {/* TODO - add button action to delete user profile image */}
                                                                <button className='redButton'>Delete Image</button>
                                                            </div>
                                                            
                                                            <div id='manageUserProfileName'>
                                                                <label htmlFor="name">Name: </label>
                                                                <input type="text" id="name" name="name" style={{marginBottom: '24px'}} value={users.name}/>
                                                            </div>

                                                            <div id='manageUserProfileUserType' style={{marginBottom: '24px'}}>
                                                                <label for="userType">User Type:</label>

                                                                <select name="userType" id="userType" defaultValue={users.userType}>
                                                                    <option value="Team Member">Team Member</option>
                                                                    <option value="Team Captain">Team Captain</option>
                                                                    <option value="Moderator">Moderator</option>
                                                                    <option value="Marketer">Marketer</option>
                                                                    <option value="Admin">Admin</option>
                                                                </select>
                                                            </div>
                                                            
                                                            <div id='manageUserProfileTeamRole'>
                                                                <label htmlFor="teamRole">Team Role: </label>
                                                                <input type="text" id="teamRole" name="teamRole" style={{marginBottom: '24px'}} value={users.teamRole}/>
                                                            </div>

                                                            <label htmlFor="manageUserProfileBioInput" id='manageUserProfileBioLabel'>Bio: </label>
                                                            <input type="text" id="manageUserProfileBioInput" name="manageUserProfileBioInput" style={{marginBottom: '24px'}} value={users.userBio} class='messageInputField'/>

                                                        </div>

                                                        <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                                            {/* TODO - add button action to save user profile changes */}
                                                            <button className='redButton fullWidth' onClick=
                                                                {() => close()}>
                                                                    Close
                                                            </button>

                                                            <button className='standardButton fullWidth' onClick=
                                                                {() => close()}>
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
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default AdminManageUsersList;
