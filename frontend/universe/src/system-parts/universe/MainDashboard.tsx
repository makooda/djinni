import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
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
    </AppTheme>
  );
};

export default MainDashboard;