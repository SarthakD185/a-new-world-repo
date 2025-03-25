import * as React from 'react';
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ModeratorUncompletedTasksList from './ModeratorUncompletedTasksList';
import ModeratorManageUsersList from './ModeratorManageUsersList';

function AdminLandingPage() {
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");

    // Assume the moderator's CollegeID is 6 (this should come from the session or user profile)
    const moderatorCollegeID = 6;

    let tasksInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setTasksInputText(lowerCase);
    };

    let usersInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setUsersInputText(lowerCase);
    };

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo" />

            <div className='container' style={{ marginTop: '0px' }}>
                <div className='box' id='moderatorUncompletedTasks' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>Uncompleted Tasks</h2>
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

                    <ModeratorUncompletedTasksList input={tasksInputText} />
                </div>

                <div className='box' id='moderatorManageUsers' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>Manage Users</h2>
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

                    {/* Pass CollegeID of the moderator to the ModeratorManageUsersList component */}
                    <ModeratorManageUsersList input={usersInputText} moderatorCollegeID={moderatorCollegeID} />
                </div>
            </div>
        </div>
    );
}

export default AdminLandingPage;
