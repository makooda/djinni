import * as React from 'react';
import theme from '../../theme';

import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider, SignInPage } from '@toolpad/core';
import { SupportedAuthProvider } from '@toolpad/core';

const providers: { id: SupportedAuthProvider; name: string }[] = [
  { id: 'credentials', name: 'Username and Password' },
];

// preview-start
const BRANDING = {
    logo: (
      <img
        src="https://mui.com/static/logo.svg"
        alt="MUI logo"
        style={{ height: 24 }}
      />
    ),
    title: '',
    description:'trytry'
  };
  // preview-end

function UsernameField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Username"
      name="username"
      type="text"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {},
      }}
      variant="outlined"
    />
  );
}

function PasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>          
        }        
        label="Password"
      />
    </FormControl>
  );
}

function SubmitButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Sign In
    </Button>
  );
}


export default function AdminSignInPage() {
    return (
    <AppProvider theme={theme} branding={BRANDING}>
      <SignInPage
        signIn={(provider, formData) =>
          alert(
            `Signing in with "${provider.name}" and credentials: ${formData.get('username')}, ${formData.get('password')}`,
          )
        }
        slots={{
          emailField: UsernameField,
          passwordField: PasswordField,
          submitButton: SubmitButton,          
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
