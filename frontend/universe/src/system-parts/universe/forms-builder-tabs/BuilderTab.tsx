import React from 'react';
import { Box, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormsTreeViewManager from '../forms-builder-components/FormsTreeViewManager';

export default function BuilderTab() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'grey.100',
      }}
    >
      {/* Left Column - Palette or Settings */}
      <Box
        sx={{
          width: '20%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 0.3,
          borderRadius: 0.5,
          overflow: 'auto',
          backgroundColor: 'white',
          mr: 0.3,
        }}
      >
        {/* Search Field */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 30,
            px: 1,
            width: '100%',
            mb: 1,
            borderRadius: 0.5,
            backgroundColor: 'grey.100',
            border: '1px solid',
            borderColor: 'grey.400',
            boxShadow: 'none',
          }}
        >
          <SearchIcon sx={{ fontSize: 14, color: 'grey.600', mr: 1 }} />
          <InputBase
            placeholder="Search components"
            sx={{ 
              flex: 1,
              fontSize: 12, 
              fontWeight: 400              
             }}
            inputProps={{ 'aria-label': 'search form components' }}
          />
        </Paper>

        {/* You can put your form elements palette here */}
        <Box>
          <FormsTreeViewManager />
        </Box>

      </Box>

      {/* Right Column - Preview or Canvas */}
      <Box
        sx={{
          width: '80%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 0.3,
          borderRadius: 0.5,
          overflow: 'auto',
          backgroundColor: 'white',
        }}
      >
        {/* This is where the form builder preview goes */}
        <Box>Right</Box>
      </Box>
    </Box>
  );
}
