import React from 'react';
import AppTheme from '../../shared-theme/AppTheme';
import {
  Box,
  Divider,
  InputBase,
  Paper,
  Typography
} from '@mui/material';
import DashboardLayout from './layouts/DashboardLayout';
import PageHeader from './comp/PageHeader';
import SectionBox from './comp/SectionBox';

export default function FormBuilder() {   
  // State to manage visible columns    

  return (
    <AppTheme mode="light">
      <DashboardLayout>        
        <Box height={{ xs: 'auto', sm: '100%' }}>
          <PageHeader title="Djinni Studio Code" subtitle="Form Builder" /> 
          
        </Box>
      </DashboardLayout>
    </AppTheme>
  );
}
