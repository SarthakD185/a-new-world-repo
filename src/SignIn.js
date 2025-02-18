import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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
import ForgotPassword from './components/ForgotPassword';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const navigate = useNavigate();
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    try {
      const response = await fetch('https://gq7w3gp0p5.execute-api.us-east-1.amazonaws.com/prod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store JWT token
        navigate('/', { state: { user: data.user } });
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('An error occurred during sign-in.');
    }
  };

  const validateInputs = () => {
    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">Sign in</Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailError ? 'Enter a valid email.' : ''}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordError ? 'Password must be at least 6 characters.' : ''}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                fullWidth
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained">Sign in</Button>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account? <RouterLink to="/SignUp">Sign up</RouterLink>
          </Typography>
        </Card>
      </SignInContainer>
    </>
  );
}
