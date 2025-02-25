import * as React from 'react';
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdminUncompletedTasksList from './AdminUncompletedTasksList';
import AdminManageUsersList from './AdminManageUsersList';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';

function AdminLandingPage() {

    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");

    let tasksInputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setTasksInputText(lowerCase);

    };

    let usersInputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setUsersInputText(lowerCase);

    };

    return (
    
        <div>


            <img src={logo} class='centerImagePadding'></img>

            <div class='container' style={{marginTop: '0px'}}>
                <div class='box' id='adminUncompletedTasks' style={{marginTop: '0px'}}>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Uncompleted Tasks</h2>
                        
                        {/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
                        <div className="search">
                            <TextField
                            id="outlined-basic"
                            onChange={tasksInputHandler}
                            variant="outlined"
                            fullWidth
                            label="Search"
                            />
                        </div>
                    </div>

                    <AdminUncompletedTasksList input={tasksInputText} />

                </div>

                <div class='box' id='adminManageUsers' style={{marginTop: '0px'}}>
                    <div class='horizontalFlex spaceBetween'>
                        <h2 class='noPadding noMargin'>Manage Users</h2>
                        
                        {/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
                        <div className="search">
                            <TextField
                            id="outlined-basic"
                            onChange={usersInputHandler}
                            variant="outlined"
                            fullWidth
                            label="Search"
                            />
                        </div>
                    </div>
                    
                    <AdminManageUsersList input={usersInputText}/>

                    <div class='centerButton' style={{marginTop: '24px'}}>
                        <Popup trigger=
                            {<button class='standardButton'>
                                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                    Create New User <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                                </div>
                            </button>} 
                            modal nested>
                            {
                                close => (
                                    <div className='modal popup'>
                                        <div className='content'>

                                            <h1 class='center'>Create New User</h1>

                                            <form class='center'>
                                                <label for="email">Email: </label>
                                                <input type="text" id="email" name="email" style={{marginBottom: '24px'}}></input>

                                                <div class='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                                    {/* TODO - add button action to create and save new user */}
                                                    <button class='standardButton fullWidth' onClick=
                                                        {() => close()}>
                                                            Save
                                                    </button>

                                                    <button class='redButton fullWidth' onClick=
                                                        {() => close()}>
                                                            Close
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

        </div>

    );
}

export default AdminLandingPage;