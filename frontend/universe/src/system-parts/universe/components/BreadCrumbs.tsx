import React from 'react';
import { Box, Typography ,Breadcrumbs, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box 
        sx={{ 
            marginLeft: -4,
            marginRight: -3,
            padding:2.5, 
            backgroundColor: theme.palette.grey[200] // Light grey from the theme palette
        }}
        >      
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit' }}>
        <Link underline="hover" color="inherit" href="/">
            Dashboard
        </Link>
        <Typography color="inherit">User Management</Typography>
        </Breadcrumbs>
    </Box>
  );
};

export default Footer;
