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

// imports for create tournament
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../Account';
import axios from 'axios'; 


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



    // Create Tournament Logic, copied from IndividualTournamentPage.js on March 26th
    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();
    const { isAuthenticated, role } = React.useContext(AccountContext); 

    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [teams, setTeams] = React.useState([]); 

    //navigate to sign up
    function handleClick() {
        navigate('/signup');
    }

    //fetch and log teams
    const fetchTeams = async () => {
        try {
            const response = await axios.get('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamsTournament'); // Example API endpoint
            if (response.status === 200) {
                const fetchedTeams = response.data.teams; 
                console.log('Fetched teams:', fetchedTeams); //log
                setTeams(fetchedTeams);

                const randomizedTeams = shuffleTeams(fetchedTeams); //shuffle
                console.log('Randomized teams:', randomizedTeams); //log
            } else {
                console.error('Failed to fetch teams. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
            setErrorMessage('Error fetching teams. Please try again later.');
        }
    };

    //shuffle/randomizing
    const shuffleTeams = (teams) => {
        return teams.sort(() => Math.random() - 0.5);
    };

    React.useEffect(() => {
        fetchTeams(); //fetch team on mount
    }, []); //array has to be empty before mount

    //create tourney
    const handleCreateTournament = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTournament', {
                collegeID: data.id,  //data.id and data.name are absolutely needed here
                tournamentName: data.name
            });

            if (response.status === 200) {
                setSuccessMessage('Tournament created successfully!');
            } else {
                setErrorMessage('Failed to create tournament. Status: ' + response.status);
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
            setErrorMessage('Error creating tournament. Please try again later.');
        } finally {
            setLoading(false);
        }
    };






    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo" />
            <h1 className='center'>Moderator Landing Page</h1>

            {/* Conditionally render Create Tournament button for Moderators */}
            {isAuthenticated && role === 'Moderator' && (
                <div className='centerButton'>
                    <button className='standardButton largeButton' style={{marginRight: '10px'}} onClick={handleCreateTournament} disabled={loading}>
                        {loading ? 'Creating Tournament...' : 'Create Tournament'}
                    </button>
                    {/* Display Success or Error Messages */}
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            )}

            {/* Uncompleted Tasks and Manage Users */}
            <div className='container' style={{ marginTop: '0px' }}>

                {/* Uncompleted Tasks */}
                <div className='box' id='moderatorUncompletedTasks' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>New Teams Awaiting Approval</h2>
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

                {/* Manage Users */}
                <div className='box' id='moderatorManageUsers' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>Users Pending Approval</h2>
                        <div className="search horizontalFlex">
                            <TextField
                                id="outlined-basic"
                                onChange={usersInputHandler}
                                variant="outlined"
                                fullWidth
                                label="Search"
                            />

                            {/* Filter Button */}
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
                            {/* End Filter Button */}

                        </div>
                    </div>

                    {/* Pass CollegeID of the moderator to the ModeratorManageUsersList component */}
                    <ModeratorManageUsersList input={usersInputText} moderatorCollegeID={moderatorCollegeID} tMFilter={teamMemberFilter} tCFilter={teamCaptainFilter} marFilter={marketerFilter} modFilter={moderatorFilter}/>
                </div>
                {/* End Manage Users */}
            </div>
        </div>
    );
}

export default AdminLandingPage;
