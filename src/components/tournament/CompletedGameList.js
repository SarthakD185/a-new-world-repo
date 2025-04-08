import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

function CompletedGameList({ collegeID }) {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [teams, setTeams] = useState([]);

    const teamToCollegeMap = {
        1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 20: 6,
        8: 1, 9: 1, 10: 1, 11: 2, 12: 3, 13: 1, 14: 1, 15: 1,
        16: 2, 17: 3, 18: 1, 19: 4
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getTeamNameForTourney');
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                if (Array.isArray(data.teams)) {
                    setTeams(data.teams); 
                } else {
                    setTeams([]); 
                }
            } catch (error) {
                setTeams([]); 
            }
        };
        fetchTeams();
    }, []);

    const fetchCompletedGames = async () => {
        try {
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getCompletedGames');
            if (!response.ok) {
                throw new Error('Failed to fetch completed games');
            }
            const data = await response.json();
            if (data.matches && Array.isArray(data.matches)) {
                setGames(data.matches); 
            } else {
                setError('Error fetching completed games. Please try again later.');
            }
            setLoading(false);
        } catch (error) {
            setError('Error fetching completed games. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCompletedGames();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
        if (games.length > 0 && collegeID) {
            const filtered = games.filter((game) => {
                const team1CollegeID = teamToCollegeMap[game.TeamOneID];
                const team2CollegeID = teamToCollegeMap[game.TeamTwoID];

                return team1CollegeID === collegeID || team2CollegeID === collegeID;
            });

            setFilteredGames(filtered);
        }
    }, [games, collegeID]);

    const getTeamName = (teamID) => {
        if (Array.isArray(teams)) {
            const team = teams.find(t => t.TeamID === teamID);
            return team ? team.TEAM_NAME : 'Unknown Team'; 
        }
        return 'Unknown Team'; 
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(date);
    };

    if (loading) {
        return (
            <div className='fullHeight'>
                <p className='center'>Loading completed games...</p>
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
                <p className='center'>Awaiting match results...</p>
            </div>
        );
    } else {
        return (
            <div>
                <HR />
                {filteredGames.map((game) => (
                    <div key={game.MatchID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h4 className='noMargin'>
                                    {getTeamName(game.TeamOneID)} vs {getTeamName(game.TeamTwoID)}
                                </h4>
                                <p className='smallFont'>Location: {game.Location}</p>
                            </div>

                            <div className='scoreRoundContainer'>
                                <p className='roundNumber'>
                                    <strong>Round: </strong>{game.roundNumber || 'N/A'}
                                </p>
                                <div className='score'>
                                    <span className='teamScore teamOneScore'>
                                        {game.scoreTeamOne}
                                    </span>
                                    <span className='vsText'>-</span>
                                    <span className='teamScore teamTwoScore'>
                                        {game.scoreTeamTwo}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='smallFont lightFont'>
                            Start Time: {game.Date ? formatDate(game.Date) : 'N/A'}
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default CompletedGameList;
