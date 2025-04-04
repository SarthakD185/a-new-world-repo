import React, { useState, useEffect } from "react";
import '../assets/css/Bracket.css';

// Helper function to create matchups ensuring each has exactly two teams
const createMatchups = (teams) => {
  const matchups = [];
  for (let i = 0; i < teams.length; i += 2) {
    matchups.push([teams[i], teams[i + 1]]);
  }
  return matchups;
};

export default function Bracket() {
  const [teams, setTeams] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const collegeID = "6"; // Hardcoded college ID
    fetch(`https://bywmhgmfjg.execute-api.us-east-1.amazonaws.com/prod/getModTeamList?collegeID=${collegeID}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); // Debugging line
        if (data.teams && Array.isArray(data.teams)) {
          const teamNames = data.teams.map(team => team.TEAM_NAME);
          setTeams(teamNames);
          setRounds([createMatchups(teamNames)]);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(error => console.error("Error fetching teams:", error));
  }, []);

  const handleWin = (roundIndex, matchIndex, winner) => {
    let newRounds = [...rounds];
    if (!newRounds[roundIndex + 1]) {
      newRounds[roundIndex + 1] = [];
    }

    const nextMatchIndex = matchIndex >> 1;

    // Ensure only one or two teams are in the next round match
    if (!newRounds[roundIndex + 1][nextMatchIndex]) {
      newRounds[roundIndex + 1][nextMatchIndex] = [winner];
    } else if (newRounds[roundIndex + 1][nextMatchIndex].length < 2) {
      newRounds[roundIndex + 1][nextMatchIndex].push(winner);
    } else {
      return; // Prevent adding a third team to the match
    }

    setHistory([...history, { roundIndex, matchIndex, winner }]);
    setRounds(newRounds);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    let newRounds = [...rounds];

    // Remove the last added winner from the next round
    newRounds[lastAction.roundIndex + 1][lastAction.matchIndex >> 1] =
      newRounds[lastAction.roundIndex + 1][lastAction.matchIndex >> 1].filter(
        player => player !== lastAction.winner
      );

    setHistory(history.slice(0, history.length - 1));
    setRounds(newRounds);
  };

  const handleRestart = () => {
    setRounds([createMatchups(teams)]);
    setHistory([]);
  };

  const handleSave = () => {
    const payload = {
      collegeID: "6",
      tournamentData: {
        rounds,
        history,
      },
    };

    console.log("Saving bracket with data:", payload);

    fetch("https://z1f71wtgjj.execute-api.us-east-1.amazonaws.com/prod/postTourneyData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Bracket saved response:", data);
        alert("Bracket saved successfully!");
      })
      .catch(error => {
        console.error("Error saving bracket:", error);
        alert("Failed to save bracket.");
      });
  };

  return (
    <div className="bracket-container">
      <div className="button-container">
        <button className="button button-undo" onClick={handleUndo}>
          Undo
        </button>
        <button className="button button-restart" onClick={handleRestart}>
          Restart
        </button>
        <button className="button button-save" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="round-section">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="round">
            <h2 className="text-lg font-bold mb-2">{`Round ${roundIndex + 1}`}</h2>
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="match-box">
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
      {rounds.length > 0 && rounds[rounds.length - 1].length === 1 && rounds[rounds.length - 1][0].length === 1 && (
        <div className="winner-text">
          Winner: {rounds[rounds.length - 1][0][0]}
        </div>
      )}
    </div>
  );
}
