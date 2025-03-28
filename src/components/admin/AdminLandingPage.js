import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
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
import { FaFilter } from "react-icons/fa";
import data from '../../assets/data/colleges.json';
import $ from 'jquery';
import AdminActionButtons from './AdminActionButtons';

function AdminLandingPage() {
    const navigate = useNavigate(); // Hook to navigate between pages

    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");

    const [teamMemberFilter, setTeamMemberFilter] = useState(true);
    const [teamCaptainFilter, setTeamCaptainFilter] = useState(true);
    const [marketerFilter, setMarketerFilter] = useState(true);
    const [moderatorFilter, setModeratorFilter] = useState(true);
    const [adminFilter, setAdminFilter] = useState(true);
    const [collegeFilter, setCollegeFilter] = useState(["All Colleges", null]);

    let tasksInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setTasksInputText(lowerCase);
    };

    let usersInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setUsersInputText(lowerCase);
    };

    function handleSelect(collegeName) {
        if(collegeName === "All Colleges") {
            setCollegeFilter(["All Colleges", null]);
        } else {
            data.forEach(college => {
                if(college.name === collegeName){
                    setCollegeFilter([collegeName, college.id]);
                }
            });
        }
    }

    // Redirect to SignUp page
    const redirectToSignup = () => {
        navigate('/signup'); // Directly navigate to the SignUp page
    };

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo"/>
            <h1 className='center'>Welcome back, Admin!</h1>

            <div className='container' style={{marginTop: '0px'}}>
                <div className='box' id='adminUncompletedTasks' style={{marginTop: '0px'}}>
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
                    <AdminUncompletedTasksList input={tasksInputText} />
                    <AdminActionButtons />
                </div>

                <div className='box' id='adminManageUsers' style={{marginTop: '0px'}}>
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
                                                            <input type="checkbox" id="userTypeFilterAdmin" name="userTypeFilterAdmin" value="Admin" checked={adminFilter} onClick={() => setAdminFilter(adminFilter => !adminFilter)}/>
                                                            <label htmlFor="userTypeFilterAdmin">Admin</label><br/>
                                                        </div>
                                                        <div style={{marginBottom: '24px'}}>
                                                            <p style={{marginBottom: '0px'}}>College: </p>
                                                            <select name="collegeFilter" id="collegeFilterAdmin" onChange={() => handleSelect(document.getElementById("collegeFilterAdmin").value)} value={collegeFilter[0]}>
                                                                <option value="All Colleges" id={'collegeFilterAdminAllColleges'}>All Colleges</option>
                                                                {data.map((college) => (
                                                                    <option value={college.name} id={'collegeFilterAdmin' + college.id}>{college.name}</option>
                                                                ))}
                                                            </select>
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
                    <AdminManageUsersList input={usersInputText} tMFilter={teamMemberFilter} tCFilter={teamCaptainFilter} marFilter={marketerFilter} modFilter={moderatorFilter} aFilter={adminFilter} cFilter={collegeFilter}/>
                    <div className='centerButton' style={{marginTop: '24px'}}>
                        <button className='standardButton' onClick={redirectToSignup}>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                Create New User <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLandingPage;
