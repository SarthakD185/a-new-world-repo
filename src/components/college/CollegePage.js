import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../assets/css/College.css';
import TextField from "@mui/material/TextField";
import CollegeList from './CollegeList';

function CollegePage() {
    const [inputText, setInputText] = useState("");
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);

    // Fetch college data from API
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch("https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/colleges");
                const data = await response.json();
                setColleges(data);
                setFilteredColleges(data); // Initialize filteredColleges with all data
            } catch (error) {
                console.error("Error fetching colleges:", error);
            }
        };
        fetchColleges();
    }, []);

    // Handle search input
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

        const filtered = colleges.filter(college =>
            college.COLLEGE_NAME.toLowerCase().includes(lowerCase)
        );
        setFilteredColleges(filtered);
    };

    return (
        <div className='blockContainer'>
            <h1 className='center'>College List</h1>
            <div className='box borderPadding'>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                {/* Passing filteredColleges as prop to CollegeList */}
                <CollegeList colleges={filteredColleges} />
            </div>
        </div>
    );
}

export default CollegePage;
