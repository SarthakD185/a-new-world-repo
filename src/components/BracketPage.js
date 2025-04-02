import React, { useState } from "react";
import '../assets/css/Bracket.css';

// Just the list of teams
const teams = [
  "Player 1", "Player 2", "Player 3", "Player 4",
  "Player 5", "Player 6", "Player 7", "Player 8",
  "Team 3", "Team 6"
];

// Helper function to create matchups
const createMatchups = (teams) => {
  const matchups = [];
  for (let i = 0; i < teams.length; i += 2) {
    matchups.push([teams[i], teams[i + 1]]);
  }
  return matchups;
};

export default function Bracket() {
  const [rounds, setRounds] = useState([createMatchups(teams)]);
  const [history, setHistory] = useState([]);

  const handleWin = (roundIndex, matchIndex, winner) => {
    let newRounds = [...rounds];
    if (!newRounds[roundIndex + 1]) {
      newRounds[roundIndex + 1] = [];
    }
    newRounds[roundIndex + 1][matchIndex >> 1] =
      newRounds[roundIndex + 1][matchIndex >> 1] || [];
    newRounds[roundIndex + 1][matchIndex >> 1].push(winner);

    setHistory([...history, { roundIndex, matchIndex, winner }]);
    setRounds(newRounds);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    let newRounds = [...rounds];
    newRounds[lastAction.roundIndex + 1] = newRounds[lastAction.roundIndex + 1] || [];
    newRounds[lastAction.roundIndex + 1][lastAction.matchIndex >> 1] = [];

    setHistory(history.slice(0, history.length - 1));
    setRounds(newRounds);
  };

  const handleRestart = () => {
    setRounds([createMatchups(teams)]);
    setHistory([]);
  };

  return (
    <div className="bracket-container">
      <div className="button-container">
        <button
          className="button button-undo"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="button button-restart"
          onClick={handleRestart}
        >
          Restart
        </button>
        <button
          className="button button-save"
          onClick={() => alert('Save functionality not implemented yet.')}
        >
          Save
        </button>
      </div>
      <div className="round-section">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="round">
            <h2 className="text-lg font-bold mb-2">{`Round ${roundIndex + 1}`}</h2>
            {round.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="match-box"
              >
                <div className="flex flex-col gap-2">
                  {match.map((player, i) => (
                    <button
                      key={i}
                      className="match-button"
                      onClick={() => handleWin(roundIndex, matchIndex, player)}
                    >
                      {player}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {rounds[rounds.length - 1].length === 1 && rounds[rounds.length - 1][0].length === 1 && (
        <div className="winner-text">
          Winner: {rounds[rounds.length - 1][0][0]}
        </div>
      )}
    </div>
  );
}






/*import React from 'react';
import { SingleEliminationBracket, Match, createTheme } from '@g-loot/react-tournament-brackets';
import gamesData from '../assets/data/games.json';
import { useLocation } from 'react-router-dom';
import '../assets/css/Bracket.css';

const BracketPage = () => {
  const location = useLocation();
  const tournamentData = location.state;

  // Create custom theme
  const customTheme = createTheme({
    // textcolor
    textColor: { main: '#000000', highlighted: '#7b9596', dark: '#000000' },
    // match background color
    matchBackground: { main: '#FFFFFF', highlighted: '#FFFFFF', wonColor: '#E1F3F4', lostColor: '#E1F3F4' },
    // score background color
    score: { background: { wonColor: '#FFFFFF', lostColor: '#FFFFFF' }, text: { highlightedWonColor: '#000000', highlightedLostColor: '#000000' } },  
    // border around each box
    border: { color: '#13505b', highlightedColor: '#13505b' },
    // round header background color
    roundHeader: { backgroundColor: '#13505b', fontColor: '#FFFFFF' },
    // connector color
    connectorColor: '#7fb493',
    connectorColorHighlight: '#13505b',
    win: { background: '#13505b', color: '#FFFFFF' },
    lose: { background: '#13505b', color: '#FFFFFF' },
  });

  // Format date to "Month Day at HH:MM"
  const formatMatchTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    }) + " at " + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Transform the games data into the format expected by react-tournament-brackets
  const transformGamesData = () => {
    // Filter active games and sort them by ID to ensure proper order
    const activeGames = gamesData
      .filter(game => game.status === 'active')
      // think about this line later
      // .filter(game => game.status === 'active' && game.collegeID === tournamentData?.id)
      .sort((a, b) => a.id - b.id);

    return activeGames.map(game => ({
      id: game.id.toString(),
      name: `Match ${game.id}`,
      nextMatchId: calculateNextMatchId(game.id), // Helper to determine next match
      tournamentRoundText: `Round ${Math.ceil(Math.log2(game.id + 1))}`,
      startTime: formatMatchTime(game.startTime),
      state: 'SCHEDULED',
      participants: [
        {
          id: `${game.id}-1`,
          resultText: null, // You can add score here if available
          isWinner: false,
          status: null,
          name: game.team1 || 'TBD'
        },
        {
          id: `${game.id}-2`,
          resultText: null, // You can add score here if available
          isWinner: false,
          status: null,
          name: game.team2 || 'TBD'
        }
      ]
    }));
  };

  // Helper function to calculate the next match ID in the bracket
  const calculateNextMatchId = (currentId) => {
    // In a single elimination tournament, next match ID is floor(currentId/2)
    const nextId = Math.floor(currentId / 2);
    // Return null for the final match (ID: 1)
    return currentId > 1 ? nextId.toString() : null;
  };

  const matches = transformGamesData();

  return (
    <div className="bracketContainer">
      <h1 className="bracketTitle">{tournamentData?.name || 'Tournament'} Tournament Bracket</h1>
      <div className="box bracketWrapper">
        {matches.length > 0 ? (
          <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
            theme={customTheme}
          />
        ) : (
          <p className="noMatchesMessage">No active matches found for this tournament.</p>
        )}
      </div>
    </div>
  );
};
*/