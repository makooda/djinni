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
import CodeIcon from '@mui/icons-material/CodeOutlined';

import CodeTab from './forms-builder-components/forms-builder-tabs/CodeTab';
import ConfigTab from './forms-builder-components/forms-builder-tabs/ConfigTab';
import DashboardTab from './forms-builder-components/forms-builder-tabs/DashboardTab';
import BuilderTab from './forms-builder-components/forms-builder-tabs/BuilderTab';

const tabItems = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, value: 'dashboard', hidden: false},
  { label: 'Builder', icon: <BuildIcon fontSize="small" />, value: 'builder', hidden: false },
  { label: 'Configure', icon: <SettingsIcon fontSize="small" />, value: 'config', hidden: false },
  { label: 'Code View', icon: <CodeIcon fontSize="small" />, value: 'code-view', hidden: true }
];

export default function FormBuilder() {   
  // State to manage visible columns 
  const [activeTab, setActiveTab] = useState('builder');   

const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'builder':
        return <BuilderTab />;
      case 'config':
        return <ConfigTab />;
      case 'code-view':
        return <CodeTab />;
      default:
        return null;
    }
  };

  return (
    <AppTheme mode="light">
      <DashboardLayout>
        
        <BreadcrumbsBar
            items={[
                { label: 'Home', path: '/' },
                { label: 'Admin. Workbench' , path: '/universe/admin-workbench' },
                { label: 'Forms Builder' }, // current page (no path)
            ]}
            />
        
        <Box height={{ xs: 'auto', sm: '100%' }}>
          <PageHeader title="🪄 Conjura Forms Studio" subtitle="Craft. Conjure. Control" /> 

          <FormBuilderIconTabs 
                items={tabItems} 
                value={activeTab} 
                onChange={setActiveTab} 
                tabPosition="left"
                >
              
              {/* 1st child: Dashboard */}
              <Box sx={{ p: 0.3, height: '100%' }}>
                <DashboardTab />
              </Box>

              {/* 2nd child: Builder */}
              <Box sx={{ p: 0.3, height: '100%' }}>
                <BuilderTab />
              </Box>

              {/* 3rd child: Config */}
              <Box sx={{ p: 0.3, height: '100%' }}>
                <ConfigTab />
              </Box>

              {/* 4th child: Code View */}
              <Box sx={{ p: 0.3, height: '100%' }}>
                <CodeTab />
              </Box>
            </FormBuilderIconTabs>
        </Box>
      </DashboardLayout>
    </AppTheme>
  );
}
