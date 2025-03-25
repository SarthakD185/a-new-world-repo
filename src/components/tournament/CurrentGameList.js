import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

function CurrentGameList(props) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getGames');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                
                console.log('Fetched data:', data);

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
    }, []);

    // Filter games using TeamOneID and TeamTwoID, without status check
    const filteredGames = games.filter((game) => {
        const team1CollegeID = game.TeamOneID; // Assuming TeamOneID is the collegeID for team1
        const team2CollegeID = game.TeamTwoID; // Assuming TeamTwoID is the collegeID for team2

        // Log values of TeamOneID, TeamTwoID, and props.collegeID for debugging
        console.log('Filtering:', team1CollegeID, team2CollegeID, props.collegeID);

        // Now the filter only checks for TeamOneID or TeamTwoID match with props.collegeID
        return team1CollegeID === props.collegeID || team2CollegeID === props.collegeID;
    });

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
        return (
            <div>
                <HR />
                {filteredGames.map((game) => (
                    <div key={game.MatchID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h4 className='noMargin'>{game.TeamOneID} vs {game.TeamTwoID}</h4> {/* Assuming you want to display IDs */}
                                <p className='smallFont'>Location: {game.Location}</p>
                            </div>

                            <div>
                                <p className='smallFont lightFont'>
                                    {/* Check if Date is a valid date string */}
                                    Start Time: {game.Date ? 
                                        (() => {
                                            // Ensure Date is a valid date string
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
