import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaFilter } from "react-icons/fa";
import ModeratorUncompletedTasksList from './ModeratorUncompletedTasksList';
import ModeratorManageUsersList from './ModeratorManageUsersList';

function AdminLandingPage() {
    //state management
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");
    const [teamMemberFilter, setTeamMemberFilter] = useState(true);
    const [teamCaptainFilter, setTeamCaptainFilter] = useState(true);
    const [marketerFilter, setMarketerFilter] = useState(true);
    const [moderatorFilter, setModeratorFilter] = useState(true);
    const [tournamentData, setTournamentData] = useState(null); //storing tournament data in a local state so its accessible
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [teams, setTeams] = useState([]);
    
    const navigate = useNavigate();

    //temporary
    const moderatorCollegeID = 6;

    //fetch teams on mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamsTournament');
                if (response.status === 200) {
                    const fetchedTeams = response.data.teams;
                    console.log('Fetched teams:', fetchedTeams);
                    setTeams(fetchedTeams);
                } else {
                    throw new Error(`Failed to fetch teams. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
                setErrorMessage('Error fetching teams. Please try again later.');
            }
        };

        fetchTeams();
    }, []);

    //shuffle
    const shuffleTeams = (teams) => {
        return teams.sort(() => Math.random() - 0.5);
    };

    //input changes if any
    const tasksInputHandler = (e) => setTasksInputText(e.target.value.toLowerCase());
    const usersInputHandler = (e) => setUsersInputText(e.target.value.toLowerCase());

    const handleCreateTournament = async () => {
        if (!tournamentData?.id || !tournamentData?.name) {
            setErrorMessage('Error: Tournament data is missing. Please try again later.');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTournament', {
                collegeID: tournamentData.id,
                tournamentName: tournamentData.name,
            });

            if (response.status === 200) {
                setSuccessMessage('Tournament created successfully!');
            } else {
                throw new Error(`Failed to create tournament. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
            setErrorMessage('Error creating tournament. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    //Sign Up navigation
    const handleClick = () => {
        navigate('/signup');
    };

    const fetchTournamentData = () => {
        setTournamentData({
            id: 123, // Tournament ID
            name: 'Sample Tournament', // Tournament Name
        });
    };

    useEffect(() => {
        fetchTournamentData();
    }, []);

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo" />
            <h1 className='center'>Moderator Landing Page</h1>

            {/* Conditionally render Create Tournament button for Moderators */}
            {tournamentData && (
                <div className='centerButton'>
                    <button
                        className='standardButton largeButton'
                        style={{ marginRight: '10px' }}
                        onClick={handleCreateTournament}
                        disabled={loading}
                    >
                        {loading ? 'Creating Tournament...' : 'Create Tournament'}
                    </button>
                    {/* Display Success or Error Messages */}
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            )}

            {/* Main content section */}
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
                            <div className='centerButton' style={{ marginLeft: '12px' }}>
                                <Popup
                                    trigger={<button className='secondaryButton' style={{ padding: '8px 8px 6px 8px' }}><FaFilter /></button>}
                                    modal nested
                                >
                                    {
                                        close => (
                                            <div className='modal popup'>
                                                <div className='content'>
                                                    <h1 className='center'>Filter Users</h1>
                                                    <form>
                                                        <div style={{ marginBottom: '24px' }}>
                                                            <p style={{ marginBottom: '0px' }}>User Type: </p>
                                                            <input
                                                                type="checkbox"
                                                                id="userTypeFilterTeamMember"
                                                                value="Team Member"
                                                                checked={teamMemberFilter}
                                                                onClick={() => setTeamMemberFilter(prev => !prev)}
                                                            />
                                                            <label htmlFor="userTypeFilterTeamMember">Team Member</label><br />
                                                            <input
                                                                type="checkbox"
                                                                id="userTypeFilterTeamCaptain"
                                                                value="Team Captain"
                                                                checked={teamCaptainFilter}
                                                                onClick={() => setTeamCaptainFilter(prev => !prev)}
                                                            />
                                                            <label htmlFor="userTypeFilterTeamCaptain">Team Captain</label><br />
                                                            <input
                                                                type="checkbox"
                                                                id="userTypeFilterMarketer"
                                                                value="Marketer"
                                                                checked={marketerFilter}
                                                                onClick={() => setMarketerFilter(prev => !prev)}
                                                            />
                                                            <label htmlFor="userTypeFilterMarketer">Marketer</label><br />
                                                            <input
                                                                type="checkbox"
                                                                id="userTypeFilterModerator"
                                                                value="Moderator"
                                                                checked={moderatorFilter}
                                                                onClick={() => setModeratorFilter(prev => !prev)}
                                                            />
                                                            <label htmlFor="userTypeFilterModerator">Moderator</label><br />
                                                        </div>
                                                        <div className='centerButton' style={{ gap: '24px' }}>
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
                    <ModeratorManageUsersList
                        input={usersInputText}
                        moderatorCollegeID={moderatorCollegeID}
                        tMFilter={teamMemberFilter}
                        tCFilter={teamCaptainFilter}
                        marFilter={marketerFilter}
                        modFilter={moderatorFilter}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminLandingPage;
