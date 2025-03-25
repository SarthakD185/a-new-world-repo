import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import { useLocation } from "react-router-dom";
import AnnouncementsList from '../college/AnnouncementsList';
import CurrentGameList from './CurrentGameList';
import NextGameModule from './NextGameModule';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../Account'; // Import AccountContext to check role
import axios from 'axios'; // Import Axios for making HTTP requests

function IndividualTournamentPage() {
    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();
    const { isAuthenticated, role } = React.useContext(AccountContext); // Access role from context

    // State for loading and response
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [teams, setTeams] = React.useState([]); // Store teams here

    // Function to navigate to the sign-up page
    function handleClick() {
        navigate('/signup');
    }

    // Fetch teams and log them
    const fetchTeams = async () => {
        try {
            const response = await axios.get('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamsTournament'); // Example API endpoint
            if (response.status === 200) {
                const fetchedTeams = response.data.teams; // Assuming response contains the teams
                console.log('Fetched teams:', fetchedTeams); // Debug: log fetched teams
                setTeams(fetchedTeams);

                // Now randomize teams and log after randomization
                const randomizedTeams = shuffleTeams(fetchedTeams); // Assuming you have a shuffle function
                console.log('Randomized teams:', randomizedTeams); // Debug: log randomized teams
            } else {
                console.error('Failed to fetch teams. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
            setErrorMessage('Error fetching teams. Please try again later.');
        }
    };

    // Shuffle teams function (randomization)
    const shuffleTeams = (teams) => {
        return teams.sort(() => Math.random() - 0.5);
    };

    React.useEffect(() => {
        fetchTeams(); // Fetch teams when the component mounts
    }, []); // Empty dependency array to run once on mount

    // Function to handle Create Tournament action
    const handleCreateTournament = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
    
        try {
            const response = await axios.post('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/createTournament', {
                collegeID: data.id,  // Make sure data.id and data.name are available
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
            <div className='verticalFlexMobile480 horizontalFlex paddingTop'>
                <h1>{data.name}</h1>
                <h2>Tournament Information</h2>
            </div>

            <div className='threeColumnContainerMobile480 threeColumnContainer'>

                <div className='box' id='individualTournamentAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id} />
                </div>

                <div className='box' id='individualTournamentCurrentGames'>
                    <h2 className='noPadding noMargin'>Current Games</h2>
                    {teams.length > 0 ? (
                        <CurrentGameList collegeID={data.id} teams={teams} />  // Pass teams as a prop
                    ) : (
                        <p>Loading games...</p>
                    )}
                </div>

                <div className='box' id='individualTournamentNextGame'>
                    <h2 className='noPadding noMargin'>Next Game</h2>
                    <NextGameModule collegeID={data.id} />
                </div>

                <div id='individualTournamentButtons'>
                    <div className='centerButton'>
                        <button className='standardButton largeButton'>View Bracket</button>
                    </div>

                    <div className='centerButton'>
                        <button className='standardButton largeButton' onClick={handleClick}>Sign Up Now!</button>
                    </div>

                    {/* Conditionally render Create Tournament button for Moderators */}
                    {isAuthenticated && role === 'Moderator' && (
                        <div className='centerButton'>
                            <button className='standardButton largeButton' onClick={handleCreateTournament} disabled={loading}>
                                {loading ? 'Creating Tournament...' : 'Create Tournament'}
                            </button>
                            {/* Display Success or Error Messages */}
                            {successMessage && <p className="successMessage">{successMessage}</p>}
                            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default IndividualTournamentPage;
