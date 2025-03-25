import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

function ReportsPage() {
    const [colleges, setColleges] = useState([]);

    // Fetch college data from API
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch("https://jy7rxs047b.execute-api.us-east-1.amazonaws.com/prod/colleges");
                const data = await response.json();
                setColleges(data);
            } catch (error) {
                console.error("Error fetching colleges:", error);
            }
        };
        fetchColleges();
    }, []);

    return (
    
        <div className='container'>

            <h2>Reports</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>College Name</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {colleges.map((college) => (
                        <TableRow
                        key={college.COLLEGE_NAME}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {college.COLLEGE_NAME}
                        </TableCell>
                        <TableCell align="right">{college.calories}</TableCell>
                        <TableCell align="right">{college.fat}</TableCell>
                        <TableCell align="right">{college.carbs}</TableCell>
                        <TableCell align="right">{college.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    );
}

export default ReportsPage;