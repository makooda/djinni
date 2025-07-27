import React, { useState, useEffect } from 'react';
import { Box, IconButton, Slide } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServicesOutlined';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import IconTabs from '../comp/UniverseIconTabs';
import DragAndDropCanvas from './DragAndDropCanvas';
import CodeEditor from './CodeEditor';
import Settings from './Settings';
import SettingsPanel from './SettingsPanel';

type DroppedControl = {
  id: string;
  type: string;
  config?: Record<string, any>;
};

const TABS = [
  { label: 'Designer', value: 'designer', icon: <DesignServicesIcon /> },
  { label: 'Code View', value: 'code', icon: <CodeIcon /> },
  { label: 'Settings', value: 'settings', icon: <SettingsIcon /> },
];

export default function FormDesigner() {
  const [tab, setTab] = useState<'designer' | 'code' | 'settings'>('designer');
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);
  const [droppedControls, setDroppedControls] = useState<DroppedControl[]>([]);

  const selectedControl = droppedControls.find((ctrl) => ctrl.id === selectedControlId);

  // Restore dropped controls from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('djinni:droppedControls');
    if (stored) {
      try {
        setDroppedControls(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse stored controls:', err);
      }
    }
  }, []);

  // Persist dropped controls to localStorage
  useEffect(() => {
    localStorage.setItem('djinni:droppedControls', JSON.stringify(droppedControls));
  }, [droppedControls]);

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
        {tab === 'designer' && (
          <Box sx={{ display: 'flex', height: '100%', position: 'relative' }}>
            {/* Canvas */}
            <Box sx={{ flexGrow: 1, pr: showSidebar ? 0.3 : 0 }}>
              <DragAndDropCanvas
                droppedControls={droppedControls}
                setDroppedControls={setDroppedControls}
                selectedControlId={selectedControlId}
                setSelectedControlId={setSelectedControlId}
                isPreview={false} // Default to false for the designer view
                setIsPreview={() => {}} // No-op for designer view, as preview is handled by a separate tab
              />
            </Box>

            {/* Toggle Sidebar Button */}
            <IconButton
              size="small"
              onClick={() => setShowSidebar(!showSidebar)}
              disableRipple
              disableFocusRipple
              sx={{
                position: 'absolute',
                top: '50%',
                right: showSidebar ? 195 : 0,
                transform: 'translateY(-50%)',
                zIndex: 1000,
                p: 0.5,
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                minWidth: 'auto',
                '&:hover': { backgroundColor: 'transparent' },
                '&:focus': { outline: 'none' },
              }}
            >
              {showSidebar ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </IconButton>

            {/* Settings Panel */}
            <Slide direction="left" in={showSidebar} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: 200,
                  backgroundColor: 'white',
                  p: 0.3,
                  borderRadius: 0.5,
                  borderLeft: 'none',
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <SettingsPanel
                  selectedControl={selectedControl || null}
                  setDroppedControls={setDroppedControls}
                />
              </Box>
            </Slide>
          </Box>
        )}

        {tab === 'code' && <CodeEditor />}
        {tab === 'settings' && <Settings />}
      </IconTabs>
    </Box>
  );
}
