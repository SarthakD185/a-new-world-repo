import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

import DatePicker from "react-datepicker";

// logic copied from ModeratorLandingPage.js on 04/06 at 1:00pm


function CreateTournamentPopup() {
    const navigate = useNavigate(); 
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentStartDate, setTournamentStartDate] = useState('');
    const [tournamentLocation, setTournamentLocation] = useState('');
    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");
    const [tournamentData, setTournamentData] = useState(null); //storing tournament data in a local state so its accessible
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [teams, setTeams] = useState([]);


    //tournament creation and insert
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
                tournamentLocation: tournamentData.location,
                tournamentStartDate: tournamentData.startDate,
                // startDate: tournamentStartDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
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

    const handleDateChange = (date) => {
        setTournamentStartDate(date);
    };

    return (
        <div className='adminActionsContainer centerButton' style={{ marginTop: '24px', gap: '12px' }}>

            {/* Create New Tournament - Form with Tournament Name and Start Date */}
            <Popup trigger={
                <button className='standardButton largeButton' style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        Create New Tournament
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create a New Tournament</h1>
                            <form className='center' onSubmit={handleCreateTournament}>
                                <label htmlFor="tournamentName">Tournament Name: </label>
                                <input 
                                    type="text" 
                                    id="tournamentName" 
                                    name="tournamentName" 
                                    value={tournamentName} 
                                    onChange={(e) => setTournamentName(e.target.value)} 
                                    style={{ marginBottom: '12px' }} 
                                    required 
                                />
                                <br />


                                <label htmlFor="tournamentLocation">Tournament Location: </label>
                                <input 
                                    type="text" 
                                    id="tournamentLocation" 
                                    name="tournamentLocation" 
                                    value={tournamentLocation} 
                                    onChange={(e) => setTournamentLocation(e.target.value)} 
                                    style={{ marginBottom: '12px' }} 
                                    required 
                                />
                                <br />


                                <label htmlFor="tournamentStartDate">Tournament Start Date: </label>
                                <input 
                                    type="text" 
                                    id="tournamentStartDate" 
                                    name="tournamentStartDate" 
                                    value={tournamentStartDate}
                                    onChange={(e) => {
                                        // Only allow numbers and slashes
                                        const value = e.target.value.replace(/[^0-9/]/g, '');
                                        setTournamentStartDate(value);
                                    }}
                                    style={{ marginBottom: '12px' }} 
                                    required 
                                    placeholder="MM/DD/YYYY"
                                />

                                {/* The formatting is currenlty unusable for the date picker :(, so we're using a text input for now. 04/06/2025 at 1:30pm */}
                                {/* <DatePicker selected={tournamentStartDate} onChange={handleDateChange} dateFormat="Pp" /> */}

                                <br />

                                <div className='centerButton horizontalFlex spaceBetween' style={{ gap: '24px' }}>
                                    <button type="button" className='redButton fullWidth' onClick={() => close()}>
                                        Close
                                    </button>
                                    <button type="submit" className='standardButton fullWidth'>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

        </div>
    );
}

export default CreateTournamentPopup;
