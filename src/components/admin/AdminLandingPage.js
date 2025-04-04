import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AdminManageUsersList from './AdminManageUsersList';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { FaFilter } from "react-icons/fa";
import AdminActionButtons from './AdminActionButtons';

function AdminLandingPage() {
    const navigate = useNavigate(); // Hook to navigate between pages

    const [usersInputText, setUsersInputText] = useState("");

    const [playerFilter, setPlaterFilter] = useState(true);
    const [marketerFilter, setMarketerFilter] = useState(true);
    const [moderatorFilter, setModeratorFilter] = useState(true);
    const [adminFilter, setAdminFilter] = useState(true);
    const [collegeFilter, setCollegeFilter] = useState(["All Colleges", null]);

    const [colleges, setColleges] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

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

    let usersInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setUsersInputText(lowerCase);
    };

    function handleSelect(collegeName) {
        if(collegeName === "All Colleges") {
            setCollegeFilter(["All Colleges", null]);
        } else {
            colleges.forEach(college => {
                if(college.COLLEGE_NAME === collegeName){
                    setCollegeFilter([collegeName, college.CollegeID]);
                }
            });
        }
    }

    // Redirect to SignUp page
    const redirectToSignup = () => {
        navigate('/signup'); // Directly navigate to the SignUp page
    };

    if (loading) {
        console.log("Loading data...");  // Log loading state
        return <div className="center">Loading...</div>; // Loading while fetching
    }

    if (error) {
        console.error("Error state:", error);  // Log error state
        return <div className="center">Error: {error}</div>; // Error message
    }

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo"/>
            <h1 className='center'>Welcome back, Admin!</h1>

            <div className='container' style={{marginTop: '0px'}}>
                <div className='box' id='adminUncompletedTasks' style={{marginTop: '0px'}}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>Create Accounts or College</h2>
                    </div>
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
                                                <div className='popupContent'>
                                                    <h1 className='center'>Filter Users</h1>
                                                    <form>
                                                        <div style={{marginBottom: '24px'}}>
                                                            <p style={{marginBottom: '0px'}}>User Type: </p>
                                                            <input type="checkbox" id="userTypeFilterPlayer" name="userTypeFilterPlayer" value="Player" checked={playerFilter} onClick={() => setPlaterFilter(playerFilter => !playerFilter)}/>
                                                            <label htmlFor="userTypeFilterPlayer">Player</label><br/>
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
                                                                {colleges.map((college) => (
                                                                    <option value={college.COLLEGE_NAME} id={'collegeFilterAdmin' + college.CollegeID}>{college.COLLEGE_NAME}</option>
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
                    <AdminManageUsersList input={usersInputText} pFilter={playerFilter} marFilter={marketerFilter} modFilter={moderatorFilter} aFilter={adminFilter} cFilter={collegeFilter}/>
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
