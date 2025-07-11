import React, { useState } from 'react';
import AppTheme from '../../shared-theme/AppTheme';
import {
  Box,
  Divider,
  InputBase,
  Paper,
  Typography
} from '@mui/material';
import DashboardLayout from './layouts/DashboardLayout';
import BreadcrumbsBar from './comp/BreadcrumbsBar';
import PageHeader from './comp/PageHeader';
import SectionBox from './comp/SectionBox';

import FormBuilderIconTabs from './comp/UniverseIconTabs';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';

const tabItems = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, value: 'design' },
  { label: 'Builder', icon: <BuildIcon fontSize="small" />, value: 'workflow' },
  { label: 'Configure', icon: <SettingsIcon fontSize="small" />, value: 'settings' },
];

export default function FormBuilder() {   
  // State to manage visible columns 
  const [activeTab, setActiveTab] = useState('design');   

  return (
    <AppTheme mode="light">
      <DashboardLayout>
        
        <BreadcrumbsBar
            items={[
                { label: 'Home', path: '/' },
                { label: 'DS Code', path: '/universe/ds-code' },
                { label: 'Forms Builder' }, // current page (no path)
            ]}
            />
        
        <Box height={{ xs: 'auto', sm: '100%' }}>
          <PageHeader title="Djinni Studio Code" subtitle="Form Builder" /> 

          <FormBuilderIconTabs items={tabItems} value={activeTab} onChange={setActiveTab} />
          
        </Box>
      </DashboardLayout>
    </AppTheme>
  );
}
