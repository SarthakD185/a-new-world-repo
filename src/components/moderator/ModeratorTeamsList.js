import { React, useEffect, useState } from 'react';
import { HR } from "flowbite-react";

function ModeratorTeamsList(props) {
    const [teamList, setTeamList] = useState([]); // State to hold the fetched team data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    {/* 
    useEffect(() => {
        // Fetch data from the API endpoint
        const fetchTeamList = async () => {
            console.log("Starting API request to fetch team list...");
            try {
                const response = await fetch('https://bywmhgmfjg.execute-api.us-east-1.amazonaws.com/prod/getModTeamList?collegeID=2', {
                    method: 'GET', // Ensure this is a GET request
                    headers: {
                        'Content-Type': 'application/json', // Set appropriate headers
                    },
                });

                console.log("API response status:", response.status);

                if (!response.ok) {
                    throw new Error(`Failed to fetch team list. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched team list:", data);
                setTeamList(Array.isArray(data) ? data : []); // Store fetched data in the state
            } catch (error) {
                console.error("Error fetching data:", error.message); // Log the error
                setError(error.message); // Store error message in state
            } finally {
                console.log("API request finished, setting loading to false.");
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchTeamList(); // Call the fetch function when the component mounts
    }, []); // Empty dependency array ensures this effect runs once on mount 
*/}

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
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default ModeratorTeamsList;
