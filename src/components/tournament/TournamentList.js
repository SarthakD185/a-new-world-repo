import React, { useState, useEffect } from 'react';
import { HR } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

function TournamentList(props) {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTournaments() {
            try {
                const response = await fetch("https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/tournaments", {
                    headers: {
                        "x-api-key": "YOUR_API_KEY_HERE" // If required
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setTournaments(data);
            } catch (error) {
                console.error("Error fetching tournaments:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTournaments();
    }, []);

    function handleClick(tournamentInfo) {
        // Check if tournament data exists
        const tournamentData = tournamentInfo ? {
            id: tournamentInfo.CollegeID || 'new',  // Use 'new' for a new tournament
            name: tournamentInfo.COLLEGE_NAME || 'New Tournament',  // Default name for a new tournament
            image: tournamentInfo.image || 'default_image.png'  // Default image
        } : {
            id: 'new',
            name: 'New Tournament',
            image: 'default_image.png'
        };
    
        navigate('/individualTournament', { state: tournamentData });
    }

    if (loading) return <p className="center">Loading tournaments...</p>;
    if (error) return <p className="center">Error: {error}</p>;

    // Ensure el.COLLEGE_NAME is defined before calling toLowerCase
    const filteredData = tournaments.filter((el) => {
        return props.input === '' || (el.COLLEGE_NAME && typeof el.COLLEGE_NAME === 'string' && el.COLLEGE_NAME.toLowerCase().includes(props.input.toLowerCase()));
    });

    if (filteredData.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Tournaments to Display</p>
            </div>
        );
    } else {
        return (
            <div>
                <HR />
                {filteredData.map((tournament) => (
                    <div key={tournament.CollegeID}>
                        <div className="horizontalFlex spaceBetween">
                            <div className="horizontalFlex">
                                <h3 className="listTitle">{tournament.COLLEGE_NAME}</h3>
                            </div>
                            <div className="centerButton smallMobileButton">
                                <button className="standardButton" onClick={() => handleClick(tournament)}>View Tournament</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default TournamentList;
