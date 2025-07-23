import React, { useState } from 'react';
import { Box } from '@mui/material';
import IconTabs from '../comp/UniverseIconTabs';
import DesignServicesIcon from '@mui/icons-material/DesignServicesOutlined';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

import DragAndDropCanvas from './DragAndDropCanvas';
import CodeEditor from './CodeEditor';
import Settings from './Settings';

const TABS = [
  { label: 'Designer', value: 'designer', icon: <DesignServicesIcon /> },
  { label: 'Code View', value: 'code', icon: <CodeIcon /> },
  { label: 'Settings', value: 'settings', icon: <SettingsIcon /> },
];

export default function FormDesigner() {
  const [tab, setTab] = useState<'designer' | 'code' | 'settings'>('designer');

  const handleTabChange = (newTab: string) => {
    setTab(newTab as 'designer' | 'code' | 'settings');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <IconTabs
        items={TABS}
        value={tab}
        onChange={handleTabChange}
        tabPosition="right"
      >
        {tab === 'designer' && <DragAndDropCanvas />}
        {tab === 'code' && <CodeEditor />}
        {tab === 'settings' && <Settings />}
      </IconTabs>
    </Box>
  );
}
