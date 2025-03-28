import React, { useEffect, useState } from 'react';
import PastWinnersCard from './PastWinnersCard';
import { HR } from "flowbite-react";
import '../../assets/css/PastWinners.css';

function PastWinnersList({ collegeID }) {
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        const fetchPastWinners = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/getPastWinners/${collegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch past winners');
                }
                const data = await response.json();

                // Filter past games only (completed games)
                const completedGames = data.filter(game => {
                    const gameDate = new Date(game.Date); // Assuming there's a Date field
                    return gameDate < new Date(); // Completed if past date
                });

                setGameResults(completedGames);
            } catch (error) {
                console.error('Error fetching past winners:', error);
            }
        };

        fetchPastWinners();
    }, [collegeID]);

    // Sort results
    const sortedResults = gameResults.sort((a, b) =>
        a.isSaved === b.isSaved ? a.gameNumber - b.gameNumber : a.isSaved ? 1 : -1
    );

    if (sortedResults.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Games to Display</p>
            </div>
        );
    }

    return (
        <div className='pastWinnersContainer'>
            <HR />
            {sortedResults.map((game) => (
                <div key={game.MatchID}>
                    <PastWinnersCard 
                        gameNumber={game.gameNumber}
                        team1={game.team1}
                        team2={game.team2}
                        initialWinner={game.winner}
                        initialLoser={game.loser}
                        initialSaved={game.isSaved}
                        matchID={game.MatchID} // Pass MatchID for saving results
                    />
                    <HR />
                </div>
            ))}
        </div>
    );
}

export default PastWinnersList;
