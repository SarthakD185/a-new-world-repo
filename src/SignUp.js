import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import UserPool from './UserPool';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '600px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
    maxWidth: '800px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [colleges, setColleges] = React.useState([]); // To store the college data
  const [selectedCollege, setSelectedCollege] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  // Fetch colleges on component mount
  React.useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('https://0t8p7zxufc.execute-api.us-east-1.amazonaws.com/prod/colleges');
        const result = await response.json();
        console.log('API response:', result);

        // Check if the result is an array and handle accordingly
        if (Array.isArray(result)) {
          setColleges(result);
        } else {
          console.error('Data is not an array:', result);
        }
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const formData = {
      firstname: data.get('name'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      confirm_password: data.get('password'),
      college: selectedCollege, // include the selected college here
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


    const email = formData.email; // Get email from formData
    const password = formData.password; // Get password from formData

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err){
        console.error(err);
      }
      console.log(data); 
    });

  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="John"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="lastName">Last name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Doe"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                autoComplete="name"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="jDoe123"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>

            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
            </Stack>

            <FormControl fullWidth>
              <InputLabel id="college-label">College</InputLabel>
              <Select
                labelId="college-label"
                id="college"
                value={selectedCollege}
                label="College"
                onChange={handleCollegeChange}
                required
              >
                {colleges.length === 0 ? (
                  <MenuItem value="">
                    <em>Loading...</em>
                  </MenuItem>
                ) : (
                  colleges.map((college, index) => (
                    <MenuItem key={index} value={college}>
                      {college}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
