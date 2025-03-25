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

function ReportsPage() {
    const [colleges, setColleges] = useState([]);

    // Fetch college data from API
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch("https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/colleges");
                const data = await response.json();
                setColleges(data);
                console.log(colleges);
            } catch (error) {
                console.error("Error fetching colleges:", error);
            }
        };
        fetchColleges();
    }, []);

    function createData(COLLEGE_NAME, DATE_ADDED, COLLEGE_COUNTRY, NUMBER_OF_TEAMS, COLLEGE_MODERATOR_EXISTS, COLLEGE_MARKETER_EXISTS, COLLEGE_PAGE_EXISTS, HOME_URL, MATCHES_NEXT_ROUND, MATCHES_PLAYED ) {
        return { COLLEGE_NAME, DATE_ADDED, COLLEGE_COUNTRY, NUMBER_OF_TEAMS, COLLEGE_MODERATOR_EXISTS, COLLEGE_MARKETER_EXISTS, COLLEGE_PAGE_EXISTS, HOME_URL, MATCHES_NEXT_ROUND, MATCHES_PLAYED };
    }

    const tempColleges = [
        createData('Cornell', '2025-01-31', 'United States', '12', '2', '1', '12', 'https://www.cornell.edu/', '0', '0'),
        createData('Indian Institute of Technology', '2025-01-31', 'India', '2', '1', '1', '2', 'https://home.iitd.ac.in/', '0', '0'),
        createData('Kyoto University', '2025-01-31', 'Japan', '4', '1', '1', '4', 'https://www.kyoto-u.ac.jp/en', '0', '0'),
        createData('University College Dublin', '2025-01-31', 'Ireland', '3', '2', '1', '3', 'https://www.ucd.ie/', '0', '0'),
        createData('Potifical Catholic University', '2025-01-31', 'Chile', '2', '1', '2', '2', 'https://www.uc.cl/', '0', '0'),
        createData('Rochester Institute of Technology', '2025-01-31', 'United States', '10', '4', '3', '10', 'https://www.rit.edu/', '0', '0'),
        createData('University of Buffalo', '2025-02-13', 'United States', '3', '2', '3', '5', 'https://www.buffalo.edu/', '0', '0'),
        createData('University of Rochester', '2025-02-12', 'United States', '5', '1', '2', '3', 'https://www.rochester.edu/', '0', '0')
    ];

    return (
    
        <div className='container'>

            <h2 id='reportsHeader' className='center'>Reports</h2>

            {/* https://mui.com/material-ui/react-table/?srsltid=AfmBOoryd6CfbisENUG9Q3ExNxNYRQpl6JapCk9i-JmXSTJH__HsB0m9 */}
            <TableContainer component={Paper} id="reportsTable">
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
                    {tempColleges.map((college) => (
                        <TableRow
                        key={college.COLLEGE_NAME}
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
                            <TableCell align="left"><a href={college.HOME_URL}>{college.HOME_URL}</a></TableCell>
                            <TableCell align="left">{college.MATCHES_NEXT_ROUND}</TableCell>
                            <TableCell align="left">{college.MATCHES_PLAYED}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    );
}

export default ReportsPage;