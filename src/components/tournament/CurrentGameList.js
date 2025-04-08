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
    const [isFinalRound, setIsFinalRound] = useState(false);
    const [finalRoundMatchCompleted, setFinalRoundMatchCompleted] = useState(false);

    //Fetch ongoing games with polling
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
                //Remove completed games (games with result === 1) from the list
                const ongoingGames = data.matches.filter(game => game?.Result !== 1);
                setGames(ongoingGames);  //Update ongoing games

                //Filter games based on collegeID
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

    //Polling for ongoing games (every 1 second)
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchOngoingGames();
        }, 1000); //1 sec interval

        return () => clearInterval(intervalId);
    }, []);

    //Check if all filtered games are completed
    useEffect(() => {
        const allFilteredGamesCompleted = filteredGames.every(game => game?.Result !== null);
        setAllMatchesCompleted(allFilteredGamesCompleted);

        //Check if there's only one match left and it's completed (This might be the problem for winner))
        if (filteredGames.length === 1 && filteredGames[0]?.Result !== null && isFinalRound) {
            setFinalRoundMatchCompleted(true); //Mark final match as completed
        }

        console.log('All Matches Completed:', allMatchesCompleted);
    }, [filteredGames, isFinalRound]);

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

    //Function to check if the final match is completed
    const isFinalMatchCompleted = () => {
        return filteredGames.length === 1 && filteredGames[0]?.Result !== null;
    };

    //Handle starting the next round or declaring the winner
    const handleStartNextRound = async () => {
        if (!allMatchesCompleted) {
            setError('All games must be completed before starting the next round.');
            return;
        }

        //Prevent starting the round while in progress
        if (isLoadingNextRound) {
            return;
        }

        //Only declare the winner after final match is completed
        if (isFinalRound && finalRoundMatchCompleted) {
            const winner = filteredGames[0]?.Result === 1 ? filteredGames[0]?.Team1Name : filteredGames[0]?.Team2Name;
            setError(`Tournament Over! ${winner} is the winner.`);
            setIsLoadingNextRound(false);
            return; 
        }

        setIsLoadingNextRound(true);  //Flag to prevent button from being clicked multiple times
        setIsRoundInProgress(true);  //Indicate that a new round is in progress

        //Calculate the next round number
        const nextRoundNumber = roundNumber + 1;

        try {
            //Send roundNumber in the request body
            const response = await fetch(`https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/startRound${nextRoundNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roundNumber: nextRoundNumber,  //Sending the next round number in the body
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to start Round ${nextRoundNumber}`);
            }

            const data = await response.json();
            console.log(`Round ${nextRoundNumber} started successfully:`, data);

            //Only after the new round is successfully started, we update the round number
            setRoundNumber(nextRoundNumber);
            setIsRoundInProgress(false);  //Round has ended, reset flag
            setIsLoadingNextRound(false); //Allow the button to be clicked again

            setAllMatchesCompleted(false);  //Reset for the next round
            setFilteredGames([]);  //Clear current round's games
            setError('');  //Clear any previous error message
        } catch (error) {
            console.error(`Error starting Round ${nextRoundNumber}:`, error);
            setError(`Failed to start Round ${nextRoundNumber}. Please try again later.`);
            setIsLoadingNextRound(false);  //Reset the flag in case of failure
            setIsRoundInProgress(false);  //Reset the round progress flag
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

    // Show "Start Round" button if no games are displayed and all matches are completed
    if (filteredGames.length === 0 && allMatchesCompleted && !isRoundInProgress) {
        if (isFinalRound && finalRoundMatchCompleted) {
            const winner = filteredGames[0]?.Result === 1 ? filteredGames[0]?.Team1Name : filteredGames[0]?.Team2Name;
            return (
                <div className='fullHeight'>
                    <p className='center'>Tournament Over! {winner} is the winner!</p>
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

    // Display ongoing games
    return (
        <div>
            <HR />
            <div className="roundInfo">
                <h3>Round {roundNumber}</h3>
                <p>Current round in progress</p>
            </div>

            {/* Checkbox to mark final round */}
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={isFinalRound} 
                        onChange={() => setIsFinalRound(!isFinalRound)} 
                        disabled={roundNumber !== 4} //hardcoded round 4 as final for now
                    />
                    Mark as Final Round
                </label>
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
