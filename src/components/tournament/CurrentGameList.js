import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

function CurrentGameList({ collegeID }) {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //teamMap
    const teamToCollegeMap = {
        1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 20: 6,
        8: 1, 9: 1, 10: 1, 11: 2, 12: 3, 13: 1, 14: 1, 15: 1, 
        16: 2, 17: 3, 18: 1, 19: 4
    };

    useEffect(() => {
        console.log('collegeID:', collegeID); //log

        const fetchGames = async () => {
            try {
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getGames');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                console.log('Fetched data:', data); //log

                if (data.matches && Array.isArray(data.matches)) {
                    setGames(data.matches);
                } else {
                    throw new Error('Fetched data is not in expected format');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching games:', error);
                setError('Error fetching games. Please try again later.');
                setLoading(false);
            }
        };

        fetchGames();
    }, []); //only on mount

    //filter
    useEffect(() => {
        if (games.length > 0 && collegeID) {
            console.log('Filtering games for collegeID:', collegeID);

            //filter
            const filtered = games.filter((game) => {
                const team1CollegeID = teamToCollegeMap[game.TeamOneID];
                const team2CollegeID = teamToCollegeMap[game.TeamTwoID];

                console.log('Checking game:', game.MatchID);
                console.log('Team1 CollegeID:', team1CollegeID, 'vs Team2 CollegeID:', team2CollegeID, 'vs collegeID:', collegeID);

                //logging
                const isMatch = team1CollegeID === collegeID || team2CollegeID === collegeID;
                console.log('Does this game match? ', isMatch);
                return isMatch;
            });

            console.log('Filtered games:', filtered); //logging
            setFilteredGames(filtered);
        }
    }, [games, collegeID]); //rerun with collegeID changes

    //time formats might not use this
    const formatOptions = {
        timeStyle: "short"
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
            </div>
        );
    } else {
        console.log('Rendering games:', filteredGames); //more logging

        return (
            <div>
                <HR />
                {filteredGames.map((game) => (
                    <div key={game.MatchID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h4 className='noMargin'>{game.TeamOneID} vs {game.TeamTwoID}</h4>
                                <p className='smallFont'>Location: {game.Location}</p>
                            </div>

                            <div>
                                <p className='smallFont lightFont'>
                                    Start Time: {game.Date ? 
                                        (() => {
                                            const date = new Date(game.Date);
                                            if (isNaN(date.getTime())) {
                                                return 'Invalid Date';
                                            }
                                            return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
                                        })()
                                    : 'N/A'}
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
