import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import { useLocation } from "react-router-dom";
import AnnouncementsList from '../college/AnnouncementsList';
import CurrentGameList from '../tournament/CurrentGameList';
import NextGameModule from '../tournament/NextGameModule';
import PastWinnersCard from './PastWinnersCard';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../Account';
import axios from 'axios'; 

function ModeratorTournamentEditPage() {
    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();
    const { isAuthenticated, role } = React.useContext(AccountContext); 

    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [teams, setTeams] = React.useState([]); 


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


    return (
        <div>
            <div className='verticalFlexMobile480 horizontalFlex paddingTop' style={{justifyContent: 'center'}}>
                <h1>{data.name} Tournament Information</h1>

            </div>

            <div className='threeColumnContainerMobile480 threeColumnContainer'>

                <div className='box' id='individualTournamentWinners'>
                    <h2>Past Winners</h2>
                    <PastWinnersCard 
                        gameNumber={1}
                        team1="Team A"
                        team2="Team B"
                    />
                    <PastWinnersCard 
                        gameNumber={2}
                        team1="Team C"
                        team2="Team D"
                    />
                </div> 

                <div className='box' id='individualTournamentCurrentGames'>
                    <h2 className='noPadding noMargin'>Current Games</h2>
                    {teams.length > 0 ? (
                        <CurrentGameList collegeID={data.id} teams={teams} />  //passing team as prop
                    ) : (
                        <p>Loading games...</p>
                    )}
                </div>

                <div className='box' id='individualTournamentPastGames'>
                    <h2 className='noPadding noMargin'>Completed Games</h2>
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
                </div>

            </div>
        </div>
    );
}

export default ModeratorTournamentEditPage;
