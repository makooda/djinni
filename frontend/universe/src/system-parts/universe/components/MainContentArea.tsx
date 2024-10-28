import React from 'react';
import { Box, Container, Typography, Toolbar } from '@mui/material';

const MainContentArea: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Toolbar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Main Content
        </Typography>
        {/* Add main dashboard content here */}
      </Container>
    </Box>
  );
};

export default MainContentArea;
