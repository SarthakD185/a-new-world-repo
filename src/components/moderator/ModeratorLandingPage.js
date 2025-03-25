import * as React from 'react';
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ModeratorUncompletedTasksList from './ModeratorUncompletedTasksList';
import ModeratorManageUsersList from './ModeratorManageUsersList';
import Popup from 'reactjs-popup';
import { FaFilter } from "react-icons/fa";

function AdminLandingPage() {
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");

    const [teamMemberFilter, setTeamMemberFilter] = useState(true);
    const [teamCaptainFilter, setTeamCaptainFilter] = useState(true);
    const [marketerFilter, setMarketerFilter] = useState(true);
    const [moderatorFilter, setModeratorFilter] = useState(true);

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
                        <div className="search horizontalFlex">
                            <TextField
                                id="outlined-basic"
                                onChange={usersInputHandler}
                                variant="outlined"
                                fullWidth
                                label="Search"
                            />

                            <div className='centerButton' style={{marginLeft: '12px'}}>
                                <Popup trigger={
                                    <button className='secondaryButton' style={{padding: '8px 8px 6px 8px'}}>
                                        <FaFilter />
                                    </button>} 
                                    modal nested>
                                    {
                                        close => (
                                            <div className='modal popup'>
                                                <div className='content'>
                                                    <h1 className='center'>Filter Users</h1>
                                                    <form>
                                                        <div style={{marginBottom: '24px'}}>
                                                            <p style={{marginBottom: '0px'}}>User Type: </p>
                                                            <input type="checkbox" id="userTypeFilterTeamMember" name="userTypeFilterTeamMember" value="Team Member" checked={teamMemberFilter} onClick={() => setTeamMemberFilter(teamMemberFilter => !teamMemberFilter)}/>
                                                            <label htmlFor="userTypeFilterTeamMember">Team Member</label><br/>
                                                            <input type="checkbox" id="userTypeFilterTeamCaptain" name="userTypeFilterTeamCaptain" value="Team Captain" checked={teamCaptainFilter} onClick={() => setTeamCaptainFilter(teamCaptainFilter => !teamCaptainFilter)}/>
                                                            <label htmlFor="userTypeFilterTeamCaptain">Team Captain</label><br/>
                                                            <input type="checkbox" id="userTypeFilterMarketer" name="userTypeFilterMarketer" value="Marketer" checked={marketerFilter} onClick={() => setMarketerFilter(marketerFilter => !marketerFilter)}/>
                                                            <label htmlFor="userTypeFilterMarketer">Marketer</label><br/>
                                                            <input type="checkbox" id="userTypeFilterModerator" name="userTypeFilterModerator" value="Moderator" checked={moderatorFilter} onClick={() => setModeratorFilter(moderatorFilter => !moderatorFilter)}/>
                                                            <label htmlFor="userTypeFilterModerator">Moderator</label><br/>
                                                        </div>
                                                        <div className='centerButton' style={{gap: '24px'}}>
                                                            <button className='standardButton fullWidth' onClick={() => close()}>
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

                    {/* Pass CollegeID of the moderator to the ModeratorManageUsersList component */}
                    <ModeratorManageUsersList input={usersInputText} moderatorCollegeID={moderatorCollegeID} tMFilter={teamMemberFilter} tCFilter={teamCaptainFilter} marFilter={marketerFilter} modFilter={moderatorFilter}/>
                </div>
            </div>
        </div>
    );
}

export default AdminLandingPage;
