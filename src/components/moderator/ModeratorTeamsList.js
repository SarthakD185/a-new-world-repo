import { React, useEffect, useState } from 'react';
import { HR } from "flowbite-react";

function ModeratorTeamsList(props) {
    const [teamList, setTeamList] = useState([]); // State to hold the fetched team data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/teams/${props.moderatorCollegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                console.log("API response data:", data); //log
                setTeamList(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchTeams();
    }, [props.moderatorCollegeID]);

    // Delete function
    const handleDeleteTeam = async (teamID) => {
        try {
            console.log(`Deleting team with ID: ${teamID}`);
            const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/teams/deleteTeam?teamID=${teamID}`, {
                method: 'DELETE',
            });
    
            const responseText = await response.text(); // Capture raw response
            console.log("Delete API response:", responseText);
    
            if (!response.ok) {
                throw new Error('Failed to delete team');
            }
    
            setTeamList(teamList.filter(team => team.teamID !== teamID));
            alert("Team deleted successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error deleting team:', err);
            alert('Failed to delete team');
        }
    };

    // If still loading, show a loading message
    if (loading) {
        console.log("Loading data...");
        return <div>Loading...</div>;
    }

    // If there's an error fetching the data, show the error message
    if (error) {
        console.log("An error occurred:", error);
        return <div>Error: {error}</div>;
    }

    console.log("Filtering team list with input:", props.input);

    // Filtering teams
    // eslint-disable-next-line
    const filteredTeams = teamList.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return (
                el.TEAM_NAME.toLowerCase().includes(props.input.toLowerCase())
            );
        }
    });

    if (filteredTeams.length === 0) {
        console.log("No teams to display after filtering.");
        return (
            <div className="fullHeight">
                <p className="center">No Teams to Display</p>
            </div>
        );
    } else {
        console.log("Filtered teams:", filteredTeams);
        return (
            <div className="overflowList">
                <HR />
                {filteredTeams.map((team) => (
                    <div key={team.TeamID}>
                        <div className="horizontalFlex spaceBetween">
                            <div>
                                <h3>{team.TEAM_NAME}</h3>
                                <p>{team.TEAM_BLURB}</p>
                            </div>

                            {/* Delete Button */}
                            <div className="centerButton">
                                <button
                                    className="deleteButton"
                                    onClick={() => handleDeleteTeam(team.TeamID)} // Trigger delete on button click
                                >
                                    <span style={{ color: 'red', fontSize: '20px' }}>X Delete</span>
                                </button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default ModeratorTeamsList;
