import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';

export default function SignUp() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch colleges from backend API
    const fetchColleges = async () => {
      try {
        const response = await fetch('https://0t8p7zxufc.execute-api.us-east-1.amazonaws.com/prod');
        if (!response.ok) throw new Error('Failed to fetch colleges');
        
        const data = await response.json();
        setColleges(data); // Assume backend returns an array of colleges
      } catch (err) {
        setError('Error fetching colleges. Please try again.');
      }
    };

    fetchColleges();
  }, []);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = {
      firstname: data.get('name'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      confirm_password: data.get('password'),
      college_id: selectedCollege, // Send college ID instead of just a name
    };

    try {
      const response = await fetch('https://0t8p7zxufc.execute-api.us-east-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2 }}>
        <Card sx={{ maxWidth: 600, p: 4 }}>
          <Typography component="h1" variant="h4">Sign Up</Typography>
          {error && <Typography color="error">{error}</Typography>}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <TextField name="name" required fullWidth id="name" placeholder="John" />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <TextField name="lastName" required fullWidth id="lastName" placeholder="Doe" />
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField name="email" required fullWidth id="email" placeholder="your@email.com" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField name="username" required fullWidth id="username" placeholder="jDoe123" />
            </FormControl>

            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField name="password" required fullWidth type="password" id="password" placeholder="••••••" />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <TextField name="confirmPassword" required fullWidth type="password" id="confirmPassword" placeholder="••••••" />
              </FormControl>
            </Stack>

            <FormControl fullWidth>
              <InputLabel id="college-label">Select your College</InputLabel>
              <Select
                labelId="college-label"
                id="college"
                value={selectedCollege}
                onChange={handleCollegeChange}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {colleges.map((college) => (
                  <MenuItem key={college.id} value={college.id}>
                    {college.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Card>
      </Stack>
    </>
  );
}
