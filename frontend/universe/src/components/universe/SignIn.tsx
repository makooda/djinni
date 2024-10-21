import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { PadlockIcon } from './CustomIcons';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  React.useEffect(() => {
    document.title = ' Universe | Sigin In';
  }, []);

  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [UnauthorisedError, setUnauthorisedError] = React.useState(false);
  const [UnauthorisedErrorrMessage, setUnauthorisedErrorrMessage] = React.useState('');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError) {
      event.preventDefault();
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });

    const loginData = {
      username: data.get('username'),
      password: data.get('password')
    }

    try{
      const userServiceBaseUrl = process.env.REACT_APP_USER_MANAGEMENT_SERVICE_BASE_URL
      const signinEndpoint = 'api/signin/';
      
      const response = await axios.post(`${userServiceBaseUrl}${signinEndpoint}`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      //set unauthorised error to false and clear the message
      setUnauthorisedError(false);
      setUnauthorisedErrorrMessage('');
      console.log(response);
      
      //set the token in the local storage
      //perform redirection to the dashboard

    }catch(error){
      console.log(error);
      setUnauthorisedError(true);
      setUnauthorisedErrorrMessage('Un-Authorised User, Try Again');
    }


    event.preventDefault();
  };

  const validateInputs = () => {
    const password = document.getElementById('password') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;

    let isValid = true;
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    }else if(!username.value){
      setUsernameError(true);
      setUsernameErrorMessage('Username is required.');
      isValid = false;
    }else {
      setPasswordError(false);
      setPasswordErrorMessage('');

      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />        
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh" // Ensures the content takes the full height of the viewport
      >
        <Card variant="outlined" sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <PadlockIcon />
        </Box>
            <Typography            
            variant="h3"
            sx={{ 
              width: '100%', 
              fontSize: 'clamp(1.5rem, 10vw, 1rem)', 
              textAlign: 'center' 
            }}
            >
            Access The Universe
            </Typography>

            {UnauthorisedError && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: 'center' }}
              >
                {UnauthorisedErrorrMessage}
              </Typography>
            )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            method="POST"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username*</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="johndoe"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                /*color={emailError ? 'error' : 'primary'}*/
                sx={{ ariaLabel: 'username' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password*</FormLabel>                
              </Box>
              
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>            
          </Box>          
        </Card>
        </Box>
      </SignInContainer>
    </AppTheme>
  );
}