import { React } from 'react';
import PastWinnersCard from './PastWinnersCard';
import { HR } from "flowbite-react";
import '../../assets/css/PastWinners.css';

function PastWinnersList(props) {
    const gameResults = [
        {
            id: 1,
            gameNumber: 1,
            team1: "Team Alpha",
            team2: "Team Beta",
            collegeID: 1,
            isSaved: true,
            winner: "Team Alpha",
            loser: "Team Beta"
        },
        {
            id: 2,
            gameNumber: 2,
            team1: "Team Gamma",
            team2: "Team Delta",
            collegeID: 1,
            isSaved: false,
            winner: "",
            loser: ""
        },
    ];

    // Filter results by collegeID and sort by saved status
    const filteredResults = gameResults
        .filter((result) => result.collegeID === props.collegeID)
        .sort((a, b) => {
            // Sort unsaved (needs attention) before saved
            if (a.isSaved === b.isSaved) {
                // If save status is the same, sort by game number
                return a.gameNumber - b.gameNumber;
            }
            return a.isSaved ? 1 : -1; // Unsaved items come first
        });

    if (filteredResults.length === 0) {
        return (
            <div className='fullHeight'>
                <p className='center'>No Games to Display</p>
            </div>
        );
    }

    return (
        <div className='pastWinnersContainer'>
            <HR />
            {filteredResults.map((game) => (
                <div key={game.id}>
                    <PastWinnersCard 
                        gameNumber={game.gameNumber}
                        team1={game.team1}
                        team2={game.team2}
                        initialWinner={game.winner}
                        initialLoser={game.loser}
                        initialSaved={game.isSaved}
                    />
                    <HR />
                </div>
            ))}
        </div>
    );
}

export default PastWinnersList; 