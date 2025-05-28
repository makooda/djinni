import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card as MuiCard,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export default function ChangePassword(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!password || password.length < 6 || password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMessage('Passwords must be the same and at least 6 characters long.');
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords must be the same and at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setResponseMessage(''); // Clear any previous message

    try {
      const userServiceBaseUrl = process.env.REACT_APP_USER_MANAGEMENT_SERVICE_BASE_URL;
      const changePasswordEndpoint = 'api/updatepassword/';

      interface ChangePasswordResponse {
        message: string;
      }

      const response = await axios.post<ChangePasswordResponse>(`${userServiceBaseUrl}${changePasswordEndpoint}`,{         
            new_password: password 
    
        },{ 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
             }
        }
      );

      setResponseMessage(response.data.message);
      setLoading(false);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/universe/dashboard');
      }, 3000);

    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        setResponseMessage(error.response.data.detail || 'Password change unsuccessful.');
      } else {
        setResponseMessage('An error occurred. Please try again.');
      }
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
              Change Password
            </Typography>

            {/* Display success/error response message */}
            {responseMessage && (
              <Typography variant="body2" color={responseMessage.includes('unsuccessful') ? 'error' : 'primary'} sx={{ textAlign: 'center' }}>
                {responseMessage}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="password">Password*</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm Password*</FormLabel>
                <TextField
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  fullWidth
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>

              {/* Display loading spinner on submit */}
              <Button type="submit" fullWidth variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Save New Password'}
              </Button>
            </Box>
          </Card>
        </Box>
      </SignInContainer>
    </AppTheme>
  );
}
