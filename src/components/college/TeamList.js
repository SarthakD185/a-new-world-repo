import React from 'react';
import { HR } from "flowbite-react";
import '../../assets/css/IndividualCollege.css';

function TeamList({ teams, collegeID }) {

    // Ensure that teams is an array and is not null or undefined
    if (!teams || !Array.isArray(teams)) {
        return <div>Error: Invalid teams data.</div>;
    }

    // Filter teams by collegeID
    const filteredTeams = teams.filter(team => team.CollegeID === collegeID);

    if (filteredTeams.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Teams to Display</p>
            </div>
        );
    }

    return (
        <div>
            {filteredTeams.map((team) => (
                <div key={team.TeamID}>
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
                        <div className="centerButton">
                            <button className="secondaryButton" style={{ width: '120px' }}>
                                Join Team
                            </button>
                        </div>
                    </div>
                    <HR />
                </div>
            ))}
        </div>
    );
}

export default TeamList;
