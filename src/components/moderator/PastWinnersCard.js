import React, { useState } from 'react';
import '../../App.css';
import '../../assets/css/PastWinners.css';

function PastWinnersCard({ gameNumber, team1, team2 }) {
    const [isEditing, setIsEditing] = useState(true);
    const [winner, setWinner] = useState('');
    const [loser, setLoser] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    // currently, only 'saves' the results by assigning the input value to the viewable text. Will not save to database currently (March 27th 1pm)
    const handleSave = () => {
        if (winner && loser) {
            setIsEditing(false);
            setIsSaved(true);
            console.log('Saved results:', { gameNumber, winner, loser });
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