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
                <div class='box' id='moderatorUncompletedTasks' style={{marginTop: '0px'}}>
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

                    <ModeratorUncompletedTasksList input={tasksInputText} />

                </div>

                <div class='box' id='moderatorManageUsers' style={{marginTop: '0px'}}>
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
                    
                    <ModeratorManageUsersList input={usersInputText}/>

                </div>
                
            </div>

        </div>

    );
}

export default AdminLandingPage;