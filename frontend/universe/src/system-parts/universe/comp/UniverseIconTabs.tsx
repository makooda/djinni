import React from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';

type TabItem = {
  label: string;
  icon?: React.ReactElement;
  value: string;
  hidden?: boolean;
};

interface UniverseIconTabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

export default function IconTabs({ items, value, onChange, children }: UniverseIconTabsProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  const visibleTabs = items.filter(tab => !tab.hidden); // Filter only visible ones

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab Strip */}
      <Box sx={{ backgroundColor: 'grey.100', px: 0.3, pt: 0.3, pb: 0.3, py:0.3, borderRadius: 0.5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-flexContainer': { gap: 0.5 },
            '& .MuiTab-root': {
              minHeight: 25,
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 400,
              p:0.3,
              borderRadius: 0.5,
              //backgroundColor: 'grey.100',
              transition: 'all 0.2s ease-in-out',
              '& .MuiTab-iconWrapper': {
                fontSize: 12,
              },
              '&:hover': {
                backgroundColor: 'grey.200',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#fff',
              boxShadow: 0,
            },
          }}
        >
          {visibleTabs.map((tab) => (
            <Tab
              key={tab.value}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor: 'grey.100',
            borderRadius: 0.5,
            mt: 1,
            p: 0.3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
