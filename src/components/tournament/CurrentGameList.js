import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

function CurrentGameList({ collegeID }) {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [teams, setTeams] = useState([]);
    const [allMatchesCompleted, setAllMatchesCompleted] = useState(false); // Track if all matches are completed
    const [roundNumber, setRoundNumber] = useState(1); // Track the current round

    // Team to College mapping
    const teamToCollegeMap = {
        1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 20: 6,
        8: 1, 9: 1, 10: 1, 11: 2, 12: 3, 13: 1, 14: 1, 15: 1,
        16: 2, 17: 3, 18: 1, 19: 4
    };

    // Fetch teams on mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamNameForTourney');
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                console.log('Fetched teams:', data);

                if (Array.isArray(data.teams)) {
                    setTeams(data.teams); 
                } else {
                    console.error('Invalid data format for teams:', data);
                    setTeams([]); 
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
                setTeams([]); 
            }
        };
        fetchTeams();
    }, []);

    // Function to fetch ongoing games with polling
    const fetchOngoingGames = async () => {
        try {
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getGames');
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const data = await response.json();
            console.log('Fetched games data:', data);

            if (data.matches && Array.isArray(data.matches)) {
                setGames(data.matches);
            } else {
                throw new Error('Fetched data is not in expected format');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching ongoing games:', error);
            setError('Error fetching games. Please try again later.');
            setLoading(false);
        }
    };

    // Polling for ongoing games (every 1 second)
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchOngoingGames();
        }, 1000); // 1 second interval

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    // Filter games based on collegeID
    useEffect(() => {
        if (games.length > 0 && collegeID) {
            console.log('Filtering games for collegeID:', collegeID);

            const filtered = games.filter((game) => {
                const team1CollegeID = teamToCollegeMap[game.TeamOneID];
                const team2CollegeID = teamToCollegeMap[game.TeamTwoID];

                console.log('Checking game:', game.MatchID);
                console.log('Team1 CollegeID:', team1CollegeID, 'vs Team2 CollegeID:', team2CollegeID, 'vs collegeID:', collegeID);

                const isMatch = team1CollegeID === collegeID || team2CollegeID === collegeID;
                console.log('Does this game match? ', isMatch);
                return isMatch;
            });

            console.log('Filtered games:', filtered);
            setFilteredGames(filtered);
        }
    }, [games, collegeID]);

    // Check if all filtered games are completed (Result === 1)
    useEffect(() => {
        const allFilteredGamesCompleted = filteredGames.every(game => game.Result === 1);
        setAllMatchesCompleted(allFilteredGamesCompleted);
    }, [filteredGames]);

    const getTeamName = (teamID) => {
        if (Array.isArray(teams)) {
            const team = teams.find(t => t.TeamID === teamID);
            return team ? team.TEAM_NAME : 'Unknown Team'; 
        }
        return 'Unknown Team'; 
    };

    const formatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
    };

    // Handle starting the next round
    const handleStartNextRound = async () => {
        if (!allMatchesCompleted) {
            setError('All games must be completed before starting the next round.');
            return;
        }

        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/startRound${roundNumber + 1}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to start Round ${roundNumber + 1}`);
            }

            const data = await response.json();
            console.log(`Round ${roundNumber + 1} started successfully:`, data);

            // Update the round number and reset state for the next round
            setRoundNumber(roundNumber + 1);
            setAllMatchesCompleted(false);  // Reset for the next round
            setFilteredGames([]); // Clear current round's games
            setError(''); // Clear any previous error message
        } catch (error) {
            console.error(`Error starting Round ${roundNumber + 1}:`, error);
            setError(`Failed to start Round ${roundNumber + 1}. Please try again later.`);
        }
    };

    if (loading) {
        return (
            <div className='fullHeight'>
                <p className='center'>Loading games...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='fullHeight'>
                <p className='center'>{error}</p>
            </div>
        );
    }

    if (filteredGames.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Games to Display</p>
                {/* Show the "Start Next Round" button only if all matches are completed */}
                {allMatchesCompleted && (
                    <div className='centerButton'>
                        <button className='standardButton largeButton' onClick={handleStartNextRound}>
                            Start Round {roundNumber + 1}
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        console.log('Rendering games:', filteredGames);

        return (
            <div>
                <HR />
                <div className="roundInfo">
                    <h3>Round {roundNumber}</h3>
                    <p>Current round in progress</p>
                </div>
                {filteredGames.map((game) => (
                    <div key={game.MatchID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h4 className='noMargin'>
                                    {getTeamName(game.TeamOneID)} vs {getTeamName(game.TeamTwoID)}
                                </h4>
                                <p className='smallFont'>Location: {game.Location}</p>
                            </div>

                            <div>
                                <p className='smallFont lightFont'>
                                    Start Time: {game.Date ? formatDate(game.Date) : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default CurrentGameList;
