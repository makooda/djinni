import React from 'react';
import { Box, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormsTreeViewManager from '../forms-builder-components/FormsTreeViewManager';
import FormsDesigner from '../forms-builder-components/FormsDesigner';

const formsDataHierarchy = [
  {
    id: 'group-1',
    label: 'Claims',
    type: 'group' as const,
    children: [
      {
        id: 'group-1-1',
        label: 'Sub Claims',
        type: 'group' as const,
        children: [
          { id: 'form-1', label: 'Claim Form A', type: 'form' as const },
        ],
      },
      { id: 'form-2', label: 'Claim Form B', type: 'form' as const },
    ],
  },
];

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
      {/* Left Column - Form Grouping */}
      <Box
        sx={{
          width: '25%',
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
            sx={{ flex: 1, fontSize: 12, fontWeight: 400 }}
            inputProps={{ 'aria-label': 'search form components' }}
          />
        </Paper>

        {/* Form Tree View */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <FormsTreeViewManager initialData={formsDataHierarchy} />
        </Box>
      </Box>

      {/* Right Column - Canvas + Controls */}
      <Box
        sx={{
          width: '85%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 0.3,
          borderRadius: 0.5,
          overflow: 'auto',
          backgroundColor: 'white',
        }}
      >

        {/* Forms Designer Canvas */}
        <Box sx={{ flex: 1, p: 0.3 }}>
          <FormsDesigner />
        </Box>
      </Box>
    </Box>
  );
}
