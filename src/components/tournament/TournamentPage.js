import * as React from 'react';
import '../../App.css';
import '../../assets/css/College.css';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TournamentList from './TournamentList';

function TournamentPage() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setInputText(lowerCase);

    };

    return (
    
        <div class='blockContainer'>

            <h1 class='center'>Tournament List</h1>

            <div class='box borderPadding'>


                {/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
                <div className="search">
                    <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                    />
                </div>
                    
                <TournamentList input={inputText} />
                    
            </div>

        </div>

    );
}

export default TournamentPage;