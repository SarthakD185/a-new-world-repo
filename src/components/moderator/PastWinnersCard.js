import React, { useState } from 'react';
import '../../App.css';
import '../../assets/css/PastWinners.css';

function PastWinnersCard({
    gameNumber,
    team1,
    team2,
    initialWinner,
    initialLoser,
    initialSaved,
    collegeID,
    teams,
}) {
    const [isEditing, setIsEditing] = useState(initialSaved ? false : true);
    const [winner, setWinner] = useState(initialWinner || '');
    const [loser, setLoser] = useState(initialLoser || '');
    const [round, setRound] = useState('');  // State for selected round
    const [winnerScore, setWinnerScore] = useState('');  // State for winner score
    const [loserScore, setLoserScore] = useState('');    // State for loser score
    const [isSaved, setIsSaved] = useState(initialSaved);

    // Handle save on PastWinners
    const handleSave = async () => {
        if (winner && loser && round && winnerScore && loserScore) {  // Check if all fields are filled
            try {
                console.log('Attempting to fetch MatchID for:', { winner, loser });

                // API to get matchID
                const matchIDResponse = await fetch(
                    `https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/getMatchID?winner=${encodeURIComponent(winner)}&loser=${encodeURIComponent(loser)}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!matchIDResponse.ok) {
                    const errorMessage = await matchIDResponse.text();
                    throw new Error(`Failed to fetch matchID: ${errorMessage}`);
                }

                const matchIDData = await matchIDResponse.json();
                const matchID = matchIDData.matchID;

                console.log('MatchID fetched:', matchID);

                if (!matchID) {
                    alert('Match not found for the selected teams.');
                    return;
                }

                // Saving match result
                const saveResponse = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/updateResults', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matchID: matchID,
                        WinnerTeamName: winner,
                        LoserTeamName: loser,
                        roundNumber: round,  // Send the selected round number
                        winnerScore: winnerScore,  // Send winner score
                        loserScore: loserScore,    // Send loser score
                    }),
                });

                if (!saveResponse.ok) {
                    const errorMessage = await saveResponse.text();
                    throw new Error(`Failed to save result: ${errorMessage}`);
                }

                const result = await saveResponse.json();
                console.log('Result saved:', result);

                // Shows saved results for a couple of seconds
                setIsEditing(false);
                setIsSaved(true);

                // Resets form after a few seconds
                setTimeout(() => {
                    setIsSaved(false);
                    setWinner('');
                    setLoser('');
                    setRound('');  // Reset round
                    setWinnerScore('');  // Reset winner score
                    setLoserScore('');    // Reset loser score
                    setIsEditing(true);  // Reset to editing mode
                }, 3000); // 3 sec delay
            } catch (error) {
                console.error('Error saving result:', error);
                alert('There was an error saving the result');
            }
        } else {
            alert('Please fill out all fields (winner, loser, round, and scores)');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className='box resultsCard'>
            <div className='resultsHeader'>
                <h3>Game #{gameNumber}</h3>
                <p>{team1} vs {team2}</p>
            </div>

            {isEditing ? (
                <div className='resultsFormContainer'>
                    <div className='resultsForm'>
                        {/* Winner Dropdown */}
                        <select
                            value={winner}
                            onChange={(e) => setWinner(e.target.value)}
                            className='resultsInput'
                        >
                            <option value="">Select Winner</option>
                            {teams && teams.length > 0 ? (
                                teams.map((team) => (
                                    <option key={team.TeamID} value={team.TEAM_NAME}>
                                        {team.TEAM_NAME}
                                    </option>
                                ))
                            ) : (
                                <option value="">No teams available</option>
                            )}
                        </select>

                        {/* Loser Dropdown */}
                        <select
                            value={loser}
                            onChange={(e) => setLoser(e.target.value)}
                            className='resultsInput'
                        >
                            <option value="">Select Loser</option>
                            {teams && teams.length > 0 ? (
                                teams.map((team) => (
                                    <option key={team.TeamID} value={team.TEAM_NAME}>
                                        {team.TEAM_NAME}
                                    </option>
                                ))
                            ) : (
                                <option value="">No teams available</option>
                            )}
                        </select>

                        {/* Round Dropdown */}
                        <select
                            value={round}
                            onChange={(e) => setRound(e.target.value)}
                            className='resultsInput'
                        >
                            <option value="">Select Round</option>
                            <option value="1">Round 1</option>
                            <option value="2">Round 2</option>
                            <option value="3">Round 3</option>
                            <option value="4">Round 4</option>
                        </select>

                        {/* Winner Score Input */}
                        <input
                            type="number"
                            value={winnerScore}
                            onChange={(e) => setWinnerScore(e.target.value)}
                            placeholder="Winner Score"
                            className='resultsInput'
                        />

                        {/* Loser Score Input */}
                        <input
                            type="number"
                            value={loserScore}
                            onChange={(e) => setLoserScore(e.target.value)}
                            placeholder="Loser Score"
                            className='resultsInput'
                        />
                    </div>
                    <button
                        className='standardButton resultsSaveButton'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div className='resultsDisplayContainer'>
                    <div className='resultsDisplay'>
                        {isSaved && (
                            <div className='savedResult'>
                                <p className='winnerText'>Winner: {winner}</p>
                                <p className='loserText'>Loser: {loser}</p>
                                <p className='roundText'>Round: {round}</p>
                                <p className='winnerScoreText'>Winner Score: {winnerScore}</p> {/* Display the winner score */}
                                <p className='loserScoreText'>Loser Score: {loserScore}</p> {/* Display the loser score */}
                            </div>
                        )}
                    </div>
                    <button
                        className='secondaryButton resultsEditButton'
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
}

export default PastWinnersCard;
