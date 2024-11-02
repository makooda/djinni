import React, { useState } from 'react';
import { Box, Button, Card as MuiCard, CssBaseline, FormControl, FormLabel, TextField, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';

import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';

import Home from './HomePage'; 
import UserManagement from './UserManagementPage'; 
import Profile from './OrganizationProfilePage'; 
import Branding from './OrganizationBrandingPage'; 
import Hierarchies from './OrganizationHierarchiesPage'; 
import Setups from './OrganizationSetupsPage'; 

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

const MainDashboardContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(0),
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


const MainDashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPath, setSelectedPath] = useState<string>('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    setSearchTerm('');
  };

  const handleMenuItemClick = (path: string) => {
    setSelectedPath(path); 
    switch (path) {
      case '/admin/users':
        setSelectedComponent(<UserManagement />);
        break;
      case '/organization/profile':
        setSelectedComponent(<Profile />);
        break;
      case '/organization/branding':
        setSelectedComponent(<Branding />);
        break;
      case '/organization/hierarchies':
        setSelectedComponent(<Hierarchies />);
        break;
      case '/organization/setups':
        setSelectedComponent(<Setups />);
        break;
      default:
        setSelectedComponent(<Home />); // Default to Home or handle accordingly
    }
  };

  return (
    <AppTheme mode="light">
      <CssBaseline enableColorScheme />
        <MainDashboardContainer direction="column" justifyContent="space-between">
          <Box display="flex" flexDirection="column" height="100vh">
            <AppNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
              <Box display="flex" flexGrow={1}>
                <SideMenu onMenuItemClick={handleMenuItemClick} selectedPath={selectedPath} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  {selectedComponent}
              </Box>
          </Box>
          <Footer />
        </Box>
      </MainDashboardContainer>
    </AppTheme>
  );
};

export default MainDashboard;