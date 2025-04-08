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
import ModeratorManageUsersList from './ModeratorManageUsersList';
import ModeratorTeamsList from './ModeratorTeamsList';

function ModeratorViewDataPage() {
    //state management
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");
    const [playerFilter, setPlayerFilter] = useState(true);
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

    const handleViewTournament = () => {
        navigate('/moderator/tournamentEdit', { 
            state: {
                id: moderatorCollegeID,
                name: "Moderator "
            }
        });
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
            <h1 className='center'>Moderator View All Data Page</h1>
            <h2 className='center'>View All Teams and Users</h2>

            {/* Conditionally render Create Tournament button for Moderators */}
            {tournamentData && (
                <div className='centerButton'>
                    <button
                        className='standardButton largeButton'
                        style={{ marginRight: '10px' }}
                        onClick={handleCreateTournament}
                        disabled={loading}
                    >
                        {loading ? 'Creating Tournament...' : 'Create New Tournament'}
                    </button>
                    {/* Display Success or Error Messages */}
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            )}

            {/* View Tournament Button */}
            <div className='centerButton'>
                <button className='standardButton largeButton' style={{marginRight: '10px'}} onClick={handleViewTournament} disabled={loading}>
                    {loading ? 'Viewing Tournament...' : 'View and Edit Tournament'}
                </button>
            </div>

            {/* Team List and Manage Users */}
            <div className='container' style={{ marginTop: '0px' }}>

                {/* Team List */}
                <div className='box' id='moderatorUncompletedTasks' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>All Teams in your Tournament</h2>
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
                    <ModeratorTeamsList input={tasksInputText} moderatorCollegeID={moderatorCollegeID} />
                </div>

                {/* Manage Users */}
                <div className='box' id='moderatorManageUsers' style={{ marginTop: '0px' }}>
                    <div className='horizontalFlex spaceBetween'>
                        <h2 className='noPadding noMargin'>All Users at your College</h2>
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
                                                <div className='popupContent'>
                                                    <h1 className='center'>Filter Users</h1>
                                                    <form>
                                                        <div style={{ marginBottom: '24px' }}>
                                                            <p style={{ marginBottom: '0px' }}>User Type: </p>
                                                            <input
                                                                type="checkbox"
                                                                id="userTypeFilterPlayer"
                                                                value="Player"
                                                                checked={playerFilter}
                                                                onClick={() => setPlayerFilter(prev => !prev)}
                                                            />
                                                            <label htmlFor="userTypeFilterPlayer">Player</label><br />
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
                        pFilter={playerFilter}
                        marFilter={marketerFilter}
                        modFilter={moderatorFilter}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModeratorViewDataPage;
