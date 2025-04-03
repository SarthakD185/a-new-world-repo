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
    const [isSaved, setIsSaved] = useState(initialSaved);

    //handling save on pastwinners
    const handleSave = async () => {
        if (winner && loser) {
            try {
                console.log('Attempting to fetch MatchID for:', { winner, loser });

                //API to get matchID
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

                //saving match result
                const saveResponse = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/updateResults', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matchID: matchID,  
                        WinnerTeamName: winner,     
                        LoserTeamName: loser,       
                    }),
                });

                if (!saveResponse.ok) {
                    const errorMessage = await saveResponse.text();
                    throw new Error(`Failed to save result: ${errorMessage}`);
                }

                const result = await saveResponse.json();
                console.log('Result saved:', result);

                //shows saved results for a couple seconds
                setIsEditing(false);
                setIsSaved(true);

                //resets form after a few seconds
                setTimeout(() => {
                    setIsSaved(false);
                    setWinner('');
                    setLoser('');
                    setIsEditing(true); //reset
                }, 3000); //3sec delay
            } catch (error) {
                console.error('Error saving result:', error);
                alert('There was an error saving the result');
            }
        } else {
            alert('Please fill out both winner and loser fields');
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
