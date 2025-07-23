import React from 'react';
import { useDispatch} from 'react-redux';
import { Box, Button, Card as MuiCard, CssBaseline, FormControl, FormLabel, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../store/authSlice';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { PadlockIcon } from './CustomIcons';

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
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [unauthorizedError, setUnauthorizedError] = React.useState(false);
  const [unauthorizedErrorMessage, setUnauthorizedErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);



  const validateInputs = () => {
    let isValid = true;
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage('Username is required.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return; // Prevent submission if inputs are invalid
    }

      setLoading(true);

    try {
      const userServiceBaseUrl = import.meta.env.VITE_APP_USER_MANAGEMENT_SERVICE_BASE_URL;
      const signinEndpoint = 'api/signin/';
      
      const response = await axios.post<{ access_token: string; refresh_token: string }>(`${userServiceBaseUrl}${signinEndpoint}`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access_token, refresh_token }: { access_token: string; refresh_token: string } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      dispatch(loginSuccess({ accessToken: access_token, refreshToken: refresh_token }));
      navigate('/');

      setUnauthorizedError(false); // Clear unauthorized error if successful

    } catch (error: any) {
      console.error(error);
      // Check for password expiration or first login redirect condition
      if (error.response && error.response.status === 403) {
          const errorMessage = error.response.data.detail;

          if (errorMessage.includes('Password update required')) {
            navigate('universe/update-password'); // Redirect to update password page
            return;
          }
        }
      setUnauthorizedError(true);
      setUnauthorizedErrorMessage('Unauthorized User, Try Again');
      dispatch(loginFailure('Unauthorized User, Try Again'));
    } finally{
       setLoading(false);
    }
  };

  return (
    <AppTheme {...props} mode="light">
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
          <ColorModeSelect onThemeChange={(theme) => console.log(`Theme changed to: ${theme}`)} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <Card variant="outlined">
            <Box display="flex" justifyContent="center" mb={2}>
              <PadlockIcon />
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Enter Our world of Endless Possibilities 🌀
            </Typography>

            {unauthorizedError && (
              <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
                {unauthorizedErrorMessage}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password*</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff'}} /> : null }
                  >
                    {loading ? 'Signing In...': 'Sign in'}
              </Button>
            </Box>
          </Card>
        </Box>
      </SignInContainer>
    </AppTheme>
  );
}
