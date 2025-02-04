import * as React from 'react';
import '../../App.css';
import '../../assets/css/College.css';
import { HR } from "flowbite-react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CollegeList from './CollegeList';

function CollegePage() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setInputText(lowerCase);

    };

    return (
    
        <div class='blockContainer'>

            <h1 class='center'>College List</h1>

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


                {/* https://flowbite-react.com/docs/typography/hr */}
                <HR />
                    
                <CollegeList input={inputText} />
                    
            </div>

        </div>

    );
}

export default CollegePage;