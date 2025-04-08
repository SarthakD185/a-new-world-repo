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
import TeamsAwaitingApprovalList from './TeamsAwaitingApprovalList';
import UsersAwaitingApprovalList from './UsersAwaitingApprovalList';
import CreateTournamentPopup from './CreateTournamentPopup';

function ModeratorLandingPage() {
    // State management
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");
    const [tournamentData, setTournamentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [teams, setTeams] = useState([]);
    
    const navigate = useNavigate();

    const moderatorCollegeID = 6;

    // Fetch teams on mount
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

    // Input handlers
    const tasksInputHandler = (e) => setTasksInputText(e.target.value.toLowerCase());
    const usersInputHandler = (e) => setUsersInputText(e.target.value.toLowerCase());

    // Tournament creation
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

    const fetchTournamentData = () => {
        setTournamentData({
            id: 123,
            name: 'Sample Tournament',
        });
    };

    useEffect(() => {
        fetchTournamentData();
    }, []);

    const handleViewAllData = () => {
        navigate('/moderator/viewData');
    };

    const handleViewMarketerPage = () => {
        navigate('/marketer');
    };

    // Handle Reset Tournament Button Click
    const handleResetTournament = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.delete('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/deleteTournament');

            if (response.status === 200) {
                setSuccessMessage('Tournament has been reset successfully!');
            } else {
                throw new Error(`Failed to reset tournament. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error resetting tournament:', error);
            setErrorMessage('Error resetting tournament. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo" />
            <h1 className='center'>Moderator Landing Page</h1>

            <div className='horizontalFlex spaceBetween' id='moderatorLandingPageButtons'>
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

                {/* Reset Tournament Button */}
                <div className='centerButton' style={{ marginTop: '10px' }}>
                    <button 
                        className='standardButton largeButton' 
                        onClick={handleResetTournament}
                        disabled={loading}
                    >
                        {loading ? 'Resetting Tournament...' : 'Reset Tournament'}
                    </button>
                </div>

                {/* View All Data Button */}
                <div className='centerButton' style={{ marginTop: '10px' }}>
                    <button 
                        className='standardButton largeButton' 
                        onClick={handleViewAllData}
                    >
                        View All Teams and Users Data on this Page
                    </button>
                </div>

                {/* View Marketer Page Button */}
                <div className='centerButton' style={{ marginTop: '10px' }}>
                    <button 
                        className='standardButton largeButton' 
                        onClick={handleViewMarketerPage}
                    >
                        View Marketer Page
                    </button>
                </div>
            </div>

            {/* Teams and Users Awaiting Approval */}
            <div className='container' style={{ marginTop: '0px' }}>
                {/* Teams Awaiting Approval */}
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
                    <TeamsAwaitingApprovalList input={tasksInputText} moderatorCollegeID={moderatorCollegeID} />
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
                        </div>
                    </div>
                    <UsersAwaitingApprovalList
                        input={usersInputText}
                        moderatorCollegeID={moderatorCollegeID}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModeratorLandingPage;
