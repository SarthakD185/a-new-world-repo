import React, { useState, useContext } from 'react';
import { HR } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import '../../assets/css/IndividualCollege.css';
import { AccountContext } from '../../Account';

function TeamList({ teams, collegeID, onJoinTeam }) {
    const [joiningTeam, setJoiningTeam] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const { isAuthenticated } = useContext(AccountContext);

    //Ensure that teams is an array and is not null or undefined
    if (!teams || !Array.isArray(teams)) {
        return <div>Error: Invalid teams data.</div>;
    }

    //Filter teams by collegeID
    const filteredTeams = teams.filter(team => (team.CollegeID === collegeID && team.APPROVED === 1));

    if (filteredTeams.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Teams to Display</p>
            </div>
        );
    }

    const handleJoinClick = (event, teamID) => {
        //Prevent the default behavior of the click event
        event.stopPropagation(); //This prevents the click from triggering the team div click event

        //Instead of directly joining, call the onJoinTeam prop to trigger the popup
        if (onJoinTeam) {
            onJoinTeam(teamID);  //Pass the selected team ID to the parent for popup handling
        }
    };

    //div click navigation function
    const handleTeamClick = (teamID) => {
        navigate(`/team/${teamID}`);  //redirect to the correct team page
    };

    return (
        <div>
            {filteredTeams.map((team) => (
                <div key={team.TeamID} onClick={() => handleTeamClick(team.TeamID)} className="teamDiv">
                    <div className="horizontalFlex spaceBetween">
                        <div className="horizontalFlex">
                            {/* Show team photo, default to a placeholder image if missing */}
                            <img
                                src={team.TEAM_PHOTO ? team.TEAM_PHOTO : require('../../assets/images/teamLogo.jpg')}
                                alt="Team"
                                className="smallLogo rounded"
                            />
                            <div>
                                <h3 className="smallBottomMargin">{team.TEAM_NAME}</h3>
                                <p className="shortBio">{team.TEAM_BLURB || "No description available."}</p>
                            </div>
                        </div>

                        {/* If the user is logged in, show the join team button, otherwise show the view team button */}
                        {/* Check if the user is authenticated using the AccountContext */}
                        <div className="centerButton">
                            {isAuthenticated ? (
                                <button
                                    className="secondaryButton"
                                    style={{ width: '120px' }}
                                    onClick={(event) => handleJoinClick(event, team.TeamID)}
                                    disabled={joiningTeam === team.TeamID}
                                >
                                    {joiningTeam === team.TeamID ? "Joining..." : "Join Team"}
                                </button>
                            ) : (
                                <button
                                    className="secondaryButton"
                                    style={{ width: '120px' }}
                                    onClick={() => handleTeamClick(team.TeamID)}
                                >
                                    View Team
                                </button>
                            )}
                        </div>
                    </div>
                    <HR />
                </div>
            ))}

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TeamList;
