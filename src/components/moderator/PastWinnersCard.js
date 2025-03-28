import React, { useState } from 'react';
import '../../App.css';
import '../../assets/css/PastWinners.css';

function PastWinnersCard({ gameNumber, team1, team2, matchID, initialWinner, initialLoser, initialSaved }) {
    const [isEditing, setIsEditing] = useState(initialSaved ? false : true);
    const [winner, setWinner] = useState(initialWinner || '');
    const [loser, setLoser] = useState(initialLoser || '');
    const [isSaved, setIsSaved] = useState(initialSaved);

    // Function to handle the save of the result to the database
    const handleSave = async () => {
        if (winner && loser) {
            try {
                console.log('Attempting to save result:', { matchID, winner, loser });
                
                // API call to save the result
                const response = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/updateResults', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matchID,
                        winner,
                        loser,
                    }),
                });

                // Check if the response is okay
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Failed to save result: ${errorMessage}`);
                }

                const data = await response.json();
                console.log('Result saved:', data);

                // After saving, disable editing
                setIsEditing(false);
                setIsSaved(true);
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
                        <input
                            type="text"
                            value={winner}
                            onChange={(e) => setWinner(e.target.value)}
                            placeholder="Winner"
                            className='resultsInput'
                        />
                        <input
                            type="text"
                            value={loser}
                            onChange={(e) => setLoser(e.target.value)}
                            placeholder="Loser"
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
                        <p className='winnerText'>Winner: {winner}</p>
                        <p className='loserText'>Loser: {loser}</p>
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
