import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../assets/css/College.css';
import TextField from "@mui/material/TextField";
import TournamentList from './TournamentList';

function TournamentPage() {
    const [inputText, setInputText] = useState("");
    const [tournaments, setTournaments] = useState([]);
    const [filteredTournaments, setFilteredTournaments] = useState([]);

    // Fetch tournament data from API
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch("https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/tournaments");
                const data = await response.json();
                setTournaments(data);
                setFilteredTournaments(data); // Initialize filtered list with all tournaments
            } catch (error) {
                console.error("Error fetching tournaments:", error);
            }
        };
        fetchTournaments();
    }, []);

    // Handle search input
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

        const filtered = tournaments.filter(tournament =>
            tournament.TOURNAMENT_NAME.toLowerCase().includes(lowerCase) // Ensure search matches the tournament name
        );
        setFilteredTournaments(filtered);
    };

    return (
        <div className='blockContainer'>
            <h1 className='center'>Tournament List</h1>
            <div className='box borderPadding'>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                        value={inputText} // Keep the search input value controlled
                    />
                </div>
                {/* Passing filteredTournaments as prop to TournamentList */}
                <TournamentList tournaments={filteredTournaments} input={inputText} />
            </div>
        </div>
    );
}

export default TournamentPage;
