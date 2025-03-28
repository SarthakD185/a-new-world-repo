import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";

// https://dev.to/salehmubashar/search-bar-in-react-js-545l
function TeamsAwaitingApprovalList(props) {
    const [teams, setTeams] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/teams/${props.moderatorCollegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                console.log("API response data:", data); //log
                setTeams(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchTeams();
    }, [props.moderatorCollegeID]);

    if (loading) {
        return <div className="center">Loading...</div>;
    }

    if (error) {
        return <div className="center">Error: {error}</div>;
    }

    // Approve function
    const handleApproveTeam = async (teamID) => {
        try {
            const response = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/approveTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    TeamID: teamID,
                    approve: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve team');
            }

            //Update the UI after approval: either remove or mark the team as approved
            setTeams(teams.filter(team => team.teamID !== teamID));

            //Success message
            alert("Team approved successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error approving team:', err);
            alert('Failed to approve team');
        }
    };

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
    
            setTeams(teams.filter(team => team.teamID !== teamID));
            alert("Team deleted successfully!");
            window.location.reload();
        } catch (err) {
            console.error('Error deleting team:', err);
            alert('Failed to delete team');
        }
    };
    

    // Filtering teams
    // eslint-disable-next-line
    const filteredData = teams.filter((el) => {
        if(el.APPROVED === 0) {
            if (props.input === '') {
                return el;
            } else {
                return (
                    el.TEAM_NAME.toLowerCase().includes(props.input.toLowerCase())
                );
            }
        }
    });

    if(filteredData.length === 0){

        return(
            <div className='fullHeight'>
                <p className='center'>No Teams to Display</p>
            </div>
        )

    } else {

        return (

            <div className='overflowList'>
                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                
                {filteredData.map((team) => (
                    <div key={team.TeamID}>
                        <div className='horizontalFlex spaceBetween'>
                            <div>
                                <h3>{team.TEAM_NAME}</h3>
                            </div>

                            {/* Approve and Delete Buttons */}
                            <div className="horizontalFlex approveDeleteButtons">
                                {/* Approve Button */}
                                <div className="centerButton">
                                    <button
                                        className="approveButton"
                                        onClick={() => handleApproveTeam(team.TeamID)} // Approve action
                                    >
                                        <span style={{ color: 'green', fontSize: '20px' }}>Approve</span> {/* Red X button */}
                                    </button>
                                </div>

                                {/* Delete Button */}
                                <div className="centerButton">
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteTeam(team.TeamID)} // Trigger delete on button click
                                    >
                                        <span style={{ color: 'red', fontSize: '20px' }}>X Deny</span> {/* Red X button */}
                                        </button>
                                </div>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>

        )
    }

}



export default TeamsAwaitingApprovalList;