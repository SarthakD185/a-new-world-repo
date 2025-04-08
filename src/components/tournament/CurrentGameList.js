import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualTournament.css';

function CurrentGameList({ collegeID }) {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roundNumber, setRoundNumber] = useState(1);
    const [allMatchesCompleted, setAllMatchesCompleted] = useState(false);
    const [isRoundInProgress, setIsRoundInProgress] = useState(false);
    const [isLoadingNextRound, setIsLoadingNextRound] = useState(false);
    const [finalRoundMatchCompleted, setFinalRoundMatchCompleted] = useState(false);
    
    // State to store the final match result and winner
    const [finalMatchResult, setFinalMatchResult] = useState(null);

    // Fetch ongoing games with polling
    const fetchOngoingGames = async () => {
        try {
            const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getGames');
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error response from API:', errorMessage);
                throw new Error(`Failed to fetch games. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched games data:', data);

            if (data.matches && Array.isArray(data.matches)) {
                // Remove completed games (games with result === 1) from the list
                const ongoingGames = data.matches.filter(game => game?.Result !== 1);
                setGames(ongoingGames);  // Update ongoing games

                // Filter games based on collegeID
                setFilteredGames(ongoingGames.filter(game => 
                    game?.Team1CollegeID === collegeID || game?.Team2CollegeID === collegeID
                ));
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
        }, 1000); // 1 sec interval

        return () => clearInterval(intervalId);
    }, []);

    // Check if all filtered games are completed
    useEffect(() => {
        const allFilteredGamesCompleted = filteredGames.every(game => game?.Result !== null);
        setAllMatchesCompleted(allFilteredGamesCompleted);
    
        // Check if there's only one match left and it's completed (final match)
        if (filteredGames.length === 1 && filteredGames[0]?.Result !== null && roundNumber === 4) {
            setFinalRoundMatchCompleted(true); // Mark final match as completed
    
            // Log the final match and its result
            const finalGame = filteredGames[0];  // The final match
            console.log('Final match result:', finalGame?.Result); // Log the result of the final match
    
            // Determine the winner based on the result of the final match
            let winner;
            if (finalGame?.Result === 1) {
                winner = finalGame?.Team1Name; // Team1 wins
            } else if (finalGame?.Result === 2) {
                winner = finalGame?.Team2Name; // Team2 wins
            } else {
                winner = "Undetermined"; // If the result is neither 1 nor 2, mark it as undetermined
            }
    
            // Log the winner
            console.log('Winner of the final match:', winner);
    
            // Store the final match result (winner)
            setFinalMatchResult(winner); 
        }
    
        console.log('All Matches Completed:', allMatchesCompleted);
    }, [filteredGames, roundNumber]);

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

    const handleStartNextRound = async () => {
        if (!allMatchesCompleted) {
            setError('All games must be completed before starting the next round.');
            return;
        }

        if (isLoadingNextRound) {
            return;
        }

        if (finalRoundMatchCompleted && finalMatchResult) {
            // Tournament has ended, so show the winner and prevent starting another round
            setError(`Tournament Over! ${finalMatchResult} is the winner.`);
            setIsLoadingNextRound(false);
            return; 
        }

        setIsLoadingNextRound(true);
        setIsRoundInProgress(true);

        const nextRoundNumber = roundNumber + 1;

        try {
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/startRound${nextRoundNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roundNumber: nextRoundNumber,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to start Round ${nextRoundNumber}`);
            }

            const data = await response.json();
            console.log(`Round ${nextRoundNumber} started successfully:`, data);

            setRoundNumber(nextRoundNumber);
            setIsRoundInProgress(false);
            setIsLoadingNextRound(false);
            setAllMatchesCompleted(false);
            setFilteredGames([]);
            setError('');
        } catch (error) {
            console.error(`Error starting Round ${nextRoundNumber}:`, error);
            setError(`Failed to start Round ${nextRoundNumber}. Please try again later.`);
            setIsLoadingNextRound(false);
            setIsRoundInProgress(false);
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

    if (filteredGames.length === 0 && allMatchesCompleted && !isRoundInProgress) {
        // Only check if it is the final round (round 4)
        if (finalRoundMatchCompleted && finalMatchResult) {
            return (
                <div className='fullHeight'>
                    <p className='center'>Tournament Over! {finalMatchResult} is the winner!</p>
                </div>
            );
        }

        return (
            <div className='fullHeight'>
                <p className='center'>No Games to Display</p>
                <div className='centerButton'>
                    <button className='standardButton largeButton' onClick={handleStartNextRound}>
                        {isLoadingNextRound ? `Starting Round ${roundNumber + 1}...` : `Start Round ${roundNumber + 1}`}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <HR />
            <div className="roundInfo">
                <h3>Round {roundNumber}</h3>
                <p>Current round in progress</p>
            </div>

            {filteredGames.map((game) => (
                game ? (
                    <div key={game.MatchID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h4 className='noMargin'>
                                    {game.Team1Name} vs {game.Team2Name}
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
                ) : null
            ))}
        </div>
    );
}

export default CurrentGameList;
