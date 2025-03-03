import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { AccountContext } from './Account';  

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
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

  //authenticate from accContext
  const { authenticate } = useContext(AccountContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    //val
    if (!validateInputs()) return;

    try {
      //custom auth
      const user = await authenticate(email, password);
      console.log('Logged in successfully:', user);

      //redirect
      navigate('/');  
    } catch (err) {
      console.error('Error signing in:', err);
      setError('Invalid email or password.');  
    }
  };

  const validateInputs = () => {
    let valid = true;
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordValid = password.length >= 6;

    setEmailError(!emailValid);
    setPasswordError(!passwordValid);

    if (!emailValid || !passwordValid) valid = false;
    return valid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              error={emailError}
              helperText={emailError ? 'Enter a valid email.' : ''}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Password"
              error={passwordError}
              helperText={passwordError ? 'Password must be at least 6 characters.' : ''}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/SignUp">Sign up</Link>
          </Typography>
        </Card>
      </SignInContainer>
    </>
  );
}
