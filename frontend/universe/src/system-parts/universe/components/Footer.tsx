import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box 
      sx={{ 
        padding: 2, 
        textAlign: 'center', 
        backgroundColor: theme.palette.grey[200] // Light grey from the theme palette
      }}
    >
      <Typography variant="body2">
        © 2024 Building Something Awesome
      </Typography>
    </Box>
  );
};

export default Footer;
