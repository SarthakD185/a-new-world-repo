import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import "../assets/css/Reports.css";
import "../App.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function ReportsPage() {
    const [colleges, setColleges] = useState([]);

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

    // teamMap
    const teamToCollegeMap = {
        1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 20: 6,
        8: 1, 9: 1, 10: 1, 11: 2, 12: 3, 13: 1, 14: 1, 15: 1,
        16: 2, 17: 3, 18: 1, 19: 4
    };

    // collegeMap
    const idToCollegeNameMap = {
        1: 'Cornell', 2: 'Indian Institute of Technology', 3: 'Kyoto University', 4: 'University College Dublin', 5: 'Potifical Catholic University', 6: 'Rochester Institute of Technology', 7: 'University of Buffalo', 8: 'University of Rochester'
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

    function createDataCollege(COLLEGE_NAME, DATE_ADDED, COLLEGE_COUNTRY, NUMBER_OF_TEAMS, COLLEGE_MODERATOR_EXISTS, COLLEGE_MARKETER_EXISTS, COLLEGE_PAGE_EXISTS, HOME_URL, MATCHES_NEXT_ROUND, MATCHES_PLAYED) {
        return { COLLEGE_NAME, DATE_ADDED, COLLEGE_COUNTRY, NUMBER_OF_TEAMS, COLLEGE_MODERATOR_EXISTS, COLLEGE_MARKETER_EXISTS, COLLEGE_PAGE_EXISTS, HOME_URL, MATCHES_NEXT_ROUND, MATCHES_PLAYED };
    }

    function createDataTournament(Date, Location, TeamOneID, TeamTwoID, Result) {
        const team1CollegeID = teamToCollegeMap[TeamOneID];
        const team2CollegeID = teamToCollegeMap[TeamTwoID];
        const noMatch = 'unknown';

        if (team1CollegeID === team2CollegeID) {
            const CollegeName = idToCollegeNameMap[team1CollegeID];
            return { Date, Location, CollegeName, TeamOneID, TeamTwoID, Result };
        }

        return { Date, Location, noMatch, TeamOneID, TeamTwoID, Result };
    }

    const tempColleges = [
        createDataCollege('Cornell', '2025-01-31', 'United States', '12', '2', '1', '12', 'https://www.cornell.edu/', '0', '0'),
        createDataCollege('Indian Institute of Technology', '2025-01-31', 'India', '2', '1', '1', '2', 'https://home.iitd.ac.in/', '0', '0'),
        createDataCollege('Kyoto University', '2025-01-31', 'Japan', '4', '1', '1', '4', 'https://www.kyoto-u.ac.jp/en', '0', '0'),
        createDataCollege('University College Dublin', '2025-01-31', 'Ireland', '3', '2', '1', '3', 'https://www.ucd.ie/', '0', '0'),
        createDataCollege('Potifical Catholic University', '2025-01-31', 'Chile', '2', '1', '2', '2', 'https://www.uc.cl/', '0', '0'),
        createDataCollege('Rochester Institute of Technology', '2025-01-31', 'United States', '10', '4', '3', '10', 'https://www.rit.edu/', '0', '0'),
        createDataCollege('University of Buffalo', '2025-02-13', 'United States', '3', '2', '3', '5', 'https://www.buffalo.edu/', '0', '0'),
        createDataCollege('University of Rochester', '2025-02-12', 'United States', '5', '1', '2', '3', 'https://www.rochester.edu/', '0', '0')
    ];

    const tempTournaments = [
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '20', '5', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '6', '1', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '21', '3', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '22', '7', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '2', '4', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '14', '8', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '9', '10', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '18', '15', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '16', '11', null),
        createDataTournament('2025-03-27 04:44:52', 'Location TBD', '17', '12', null),
    ];

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
                                    <TableCell align="left">College</TableCell>
                                    <TableCell align="left">Team 1</TableCell>
                                    <TableCell align="left">Team 2</TableCell>
                                    <TableCell align="left">Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tempTournaments.map((tournament, index) => (
                                    <TableRow
                                        key={index}  // Using index to ensure unique key for each row
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {tournament.Date ? formatDate(tournament.Date) : 'N/A'}
                                        </TableCell>
                                        <TableCell align="left">{tournament.Location}</TableCell>
                                        <TableCell align="left">{tournament.CollegeName ? tournament.CollegeName : 'unknown'}</TableCell>
                                        <TableCell align="left">{tournament.TeamOneID}</TableCell>
                                        <TableCell align="left">{tournament.TeamTwoID}</TableCell>
                                        <TableCell align="left">{tournament.Result ? tournament.Result : 'No Result'}</TableCell>
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
