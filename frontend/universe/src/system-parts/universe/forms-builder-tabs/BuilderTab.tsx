import React, { useState } from 'react';
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  Slide,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
        children: [{ id: 'form-1', label: 'Claim Form A', type: 'form' as const }],
      },
      { id: 'form-2', label: 'Claim Form B', type: 'form' as const },
    ],
  },
];

export default function BuilderTab() {
  const [showLeftPanel, setShowLeftPanel] = useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'grey.100',
        position: 'relative',
      }}
    >
      {/* Slide Toggle Button */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: showLeftPanel ? 235 : 0,
          transform: 'translateY(-50%)',
          zIndex: 1000,
        }}
      >
        <IconButton
            size="small"
            onClick={() => setShowLeftPanel((prev) => !prev)}
            disableRipple
              disableFocusRipple
              sx={{
                p: 0.5,
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&:focus': {
                  outline: 'none',
                },
              }}
          >
          {showLeftPanel ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Left Panel */}
      <Slide direction="right" in={showLeftPanel} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 0.3,
            borderRadius: 0.5,
            overflow: 'auto',
            backgroundColor: 'white',
            mr: 0.3,
            boxShadow: 1,
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

          {/* TreeView */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <FormsTreeViewManager initialData={formsDataHierarchy} />
          </Box>
        </Box>
      </Slide>

      {/* Right Panel - Forms Designer */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 0.3,
          borderRadius: 0.5,
          overflow: 'auto',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ flex: 1, p: 0.3 }}>
          <FormsDesigner />
        </Box>
      </Box>
    </Box>
  );
}
