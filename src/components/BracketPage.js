import React, { useState, useEffect, useContext } from "react";
import '../assets/css/Bracket.css';
import { AccountContext } from "../Account.js"; // Update path as needed

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
  const [initialTeams, setInitialTeams] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [history, setHistory] = useState([]);
  const [collegeID, setCollegeID] = useState(() => {
  const savedCollegeID = sessionStorage.getItem('selectedCollegeID');
  return savedCollegeID ? parseInt(savedCollegeID, 10) : null;
});

  const { email: userEmail, role: userRole } = useContext(AccountContext);
  // Set isEditable after fetching API role instead
let isEditable = false;

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://kg1a83zh9k.execute-api.us-east-1.amazonaws.com/prod/getSessioning?email=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        console.log("User Role (from context):", userRole);
        if (!collegeID && data.CollegeID) {
          setCollegeID(data.CollegeID);
        }
        if (data.role === 'Moderator') isEditable = true;

        fetch(`https://grppmbkv7j.execute-api.us-east-1.amazonaws.com/prod/getTournamentData?collegeID=${data.CollegeID}`)
          .then(response => response.json())
          .then(tournamentData => {
            if (tournamentData.tournamentData && tournamentData.tournamentData.rounds && tournamentData.tournamentData.history) {
              console.log("Loaded saved tournament data:", tournamentData);
              setRounds(tournamentData.tournamentData.rounds);
              setHistory(tournamentData.tournamentData.history);

              if (tournamentData.tournamentData.rounds.length > 0) {
                const teamSet = new Set();
                tournamentData.tournamentData.rounds[0].forEach(match => match.forEach(t => teamSet.add(t)));
                const teamList = Array.from(teamSet);
                setInitialTeams(teamList);
                setTeams(teamList);
              }
            } else {
              console.log("No saved data found, loading fresh team list...");
              fetch(`https://bywmhgmfjg.execute-api.us-east-1.amazonaws.com/prod/getModTeamList?collegeID=${data.CollegeID}`)
                .then(response => response.json())
                .then(teamData => {
                  console.log("Team list API Response:", teamData);
                  if (teamData.teams && Array.isArray(teamData.teams)) {
                    const teamNames = teamData.teams.map(team => team.TEAM_NAME);
                    setTeams(teamNames);
                    setInitialTeams(teamNames);
                    setRounds([createMatchups(teamNames)]);
                  } else {
                    console.error("Unexpected team data format:", teamData);
                  }
                })
                .catch(error => console.error("Error fetching team list:", error));
            }
          })
          .catch(error => console.error("Error loading tournament data:", error));
      })
      .catch(error => console.error("Error fetching user session data:", error));
  }, [userEmail]);

  const handleWin = (roundIndex, matchIndex, winner) => {
    if (!isEditable) return;
    let newRounds = [...rounds];
    if (!newRounds[roundIndex + 1]) {
      newRounds[roundIndex + 1] = [];
    }

    const nextMatchIndex = matchIndex >> 1;

    if (!newRounds[roundIndex + 1][nextMatchIndex]) {
      newRounds[roundIndex + 1][nextMatchIndex] = [winner];
    } else if (newRounds[roundIndex + 1][nextMatchIndex].length < 2) {
      newRounds[roundIndex + 1][nextMatchIndex].push(winner);
    } else {
      return;
    }

    setHistory([...history, { roundIndex, matchIndex, winner }]);
    setRounds(newRounds);
  };

  const handleUndo = () => {
    if (!isEditable) return;
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    let newRounds = [...rounds];

    newRounds[lastAction.roundIndex + 1][lastAction.matchIndex >> 1] =
      newRounds[lastAction.roundIndex + 1][lastAction.matchIndex >> 1].filter(
        player => player !== lastAction.winner
      );

    setHistory(history.slice(0, history.length - 1));
    setRounds(newRounds);
  };

  const handleRestart = () => {
    if (!isEditable) return;
    setRounds([createMatchups(initialTeams)]);
    setHistory([]);
  };

  const handleSave = () => {
    if (!isEditable) return;
    const payload = {
      collegeID: collegeID,
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

  if (!userEmail || collegeID === null) return <p>Loading session data...</p>;

  return (
    <div className="bracket-container">
      {isEditable && (
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
      )}
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
                      disabled={!isEditable}
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
