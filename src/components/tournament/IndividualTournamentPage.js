import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import { useLocation } from "react-router-dom";
import AnnouncementsList from '../college/AnnouncementsList';
import CurrentGameList from './CurrentGameList';
import NextGameModule from './NextGameModule';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../Account';
import axios from 'axios'; 

function IndividualTournamentPage() {
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
            const response = await axios.get('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamsTournament'); 
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
            <div className='verticalFlexMobile480 horizontalFlex paddingTop' style={{justifyContent: 'center'}}>
                <h1>{data.name} Tournament Information</h1>

            </div>

            <div className='threeColumnContainerMobile480 threeColumnContainer'>

                <div className='box' id='individualTournamentAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id} />
                </div>

                <div className='box' id='individualTournamentCurrentGames'>
                    <h2 className='noPadding noMargin'>Current Games</h2>
                    {teams.length > 0 ? (
                        <CurrentGameList collegeID={data.id} teams={teams} />  //passing team as prop
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
