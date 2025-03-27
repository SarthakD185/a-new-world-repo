import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import "../assets/css/Reports.css";
import "../App.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function ReportsPage() {
    const [colleges, setColleges] = useState([]);
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);

    // Fetch college data from API
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch("https://2ouzjjxhb0.execute-api.us-east-1.amazonaws.com/prod/collegeReports");
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the data to understand the structure
                
                // Check if the data is an array or an object with an array inside it
                if (Array.isArray(data)) {
                    setColleges(data);  // If it's already an array, set it directly
                } else if (Array.isArray(data.colleges)) {
                    setColleges(data.colleges);  // If it's inside an object (e.g., { colleges: [...] }), extract the array
                } else {
                    console.error("Unexpected data structure:", data);
                }
            } catch (error) {
                console.error("Error fetching colleges:", error);
            }
        };
        fetchColleges();
    }, []);

    // Fetch match data from API
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch("https://ipa97zqhli.execute-api.us-east-1.amazonaws.com/prod/matchReports");
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the data to understand the structure
                
                // Check if the data is an array or an object with an array inside it
                if (Array.isArray(data)) {
                    setMatches(data);  // If it's already an array, set it directly
                } else if (Array.isArray(data.matches)) {
                    setMatches(data.matches);  // If it's inside an object (e.g., { matches: [...] }), extract the array
                } else {
                    console.error("Unexpected data structure:", data);
                }
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };
        fetchMatches();
    }, []);

    // Fetch team data from API
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("https://1mjp1mrshl.execute-api.us-east-1.amazonaws.com/prod/teamReports");
                const data = await response.json();
                console.log('Fetched data:', data);  // Log the data to understand the structure
                
                // Check if the data is an array or an object with an array inside it
                if (Array.isArray(data)) {
                    setTeams(data);  // If it's already an array, set it directly
                } else if (Array.isArray(data.teams)) {
                    setTeams(data.teams);  // If it's inside an object (e.g., { teams: [...] }), extract the array
                } else {
                    console.error("Unexpected data structure:", data);
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    function getTeamName(teamId){
        for( let i = 0 ; i < teams.length ; i++ ) {
            if(teams[i].TeamID === teamId) {
                return teams[i].TEAM_NAME;
            }
        }
    };

    // Date formatting options
    const formatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    // Format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
    };

    // Ensure `colleges` is an array before using .map()
    if (!Array.isArray(colleges) || colleges.length === 0) {
        return <div>Loading...</div>;  // Show a loading message until colleges data is fetched
    }

    return (
        <div className='container'>
            <h2 id='reportsHeader' className='center'>Reports</h2>

            {/* Tabs for Reports */}
            <Tabs id="reportsTables">
                <TabList style={{ marginBottom: '0' }}>
                    <Tab>Colleges Report</Tab>
                    <Tab>Matches Report</Tab>
                </TabList>

                <TabPanel>
                    <TableContainer className="reportsTable">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">College Name</TableCell>
                                    <TableCell align="left">Date Added</TableCell>
                                    <TableCell align="left">College Country</TableCell>
                                    <TableCell align="left">Number of Teams</TableCell>
                                    <TableCell align="left">College Moderator Exists</TableCell>
                                    <TableCell align="left">College Marketer Exists</TableCell>
                                    <TableCell align="left">College Page Exists</TableCell>
                                    <TableCell align="left">Home URL</TableCell>
                                    <TableCell align="left">Matches Next Round</TableCell>
                                    <TableCell align="left">Matches Played</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {colleges.map((college, index) => (
                                    <TableRow
                                        key={index}  // Using index to ensure unique key for each row
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {college.COLLEGE_NAME}
                                        </TableCell>
                                        <TableCell align="left">{college.DATE_ADDED}</TableCell>
                                        <TableCell align="left">{college.COLLEGE_COUNTRY}</TableCell>
                                        <TableCell align="left">{college.NUMBER_OF_TEAMS}</TableCell>
                                        <TableCell align="left">{college.COLLEGE_MODERATOR_EXISTS}</TableCell>
                                        <TableCell align="left">{college.COLLEGE_MARKETER_EXISTS}</TableCell>
                                        <TableCell align="left">{college.COLLEGE_PAGE_EXISTS}</TableCell>
                                        <TableCell align="left"><a href={college.HOME_URL} target="_blank" rel="noopener noreferrer">{college.HOME_URL}</a></TableCell>
                                        <TableCell align="left">{college.MATCHES_NEXT_ROUND}</TableCell>
                                        <TableCell align="left">{college.MATCHES_PLAYED}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel>
                    {/* Matches Report Table */}
                    <TableContainer className="reportsTable">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Location</TableCell>
                                    {/* <TableCell align="left">College</TableCell> */}
                                    <TableCell align="left">Team 1</TableCell>
                                    <TableCell align="left">Team 2</TableCell>
                                    <TableCell align="left">Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matches.map((match, index) => (
                                    <TableRow
                                        key={index}  // Using index to ensure unique key for each row
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {match.Date ? formatDate(match.Date) : 'N/A'}
                                        </TableCell>
                                        <TableCell align="left">{match.Location}</TableCell>
                                        {/* <TableCell align="left">{match.CollegeName ? match.CollegeName : 'unknown'}</TableCell> */}
                                        <TableCell align="left">{getTeamName(match.TeamOneID)}</TableCell>
                                        <TableCell align="left">{getTeamName(match.TeamTwoID)}</TableCell>
                                        <TableCell align="left">{match.Result ? match.Result : 'No Result'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default ReportsPage;
