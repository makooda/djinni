import React, { useState, useEffect } from 'react';
import { Box, IconButton, Slide } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServicesOutlined';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import IconTabs from '../comp/UniverseIconTabs';
import DragAndDropCanvas from './builder/DragAndDropCanvas';
import CodeEditor from './builder/CodeEditor';
import Settings from './builder/Settings';
import SettingsPanel from './settings/SettingsPanel'; // Keep this line
import { updateControlConfigRecursive } from './utils/controlUtils'; 

type DroppedControl = {
  id: string;
  type: string;
  config?: Record<string, any>;
  children?: DroppedControl[]; // Add children property to support nested controls
};


const TABS = [
  { label: 'Designer', value: 'designer', icon: <DesignServicesIcon /> },
  { label: 'Code View', value: 'code', icon: <CodeIcon /> },
  { label: 'Settings', value: 'settings', icon: <SettingsIcon /> },
];

export default function FormDesigner() {
  const [tab, setTab] = useState<'designer' | 'code' | 'settings'>('designer');
  const [showSidebar, setShowSidebar] = useState(true);
  //const [droppedControls, setDroppedControls] = useState<DroppedControl[]>([]);
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);
  //const selectedControl = droppedControls.find((ctrl) => ctrl.id === selectedControlId);
  const [droppedControls, setDroppedControls] = useState<DroppedControl[]>(() => {
  const stored = localStorage.getItem('djinni:droppedControls');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
});


  const updateControlById = (
        controls: DroppedControl[],
        id: string,
        newConfig: Record<string, any>
      ): DroppedControl[] => {
        return controls.map(control => {
          if (control.id === id) {
            return { ...control, config: { ...control.config, ...newConfig } };
          }

          if (control.children) {
            return {
              ...control,
              children: updateControlById(control.children, id, newConfig),
            };
          }

          return control;
        });
      };

    const handleControlUpdate = (
      id: string,
      updates: Record<string, any>
    ) => {
      function updateControlTree(controls: DroppedControl[]): DroppedControl[] {
        return controls.map(ctrl => {
          if (ctrl.id === id) {
            const { layout, columns, ...configUpdates } = updates;
            return {
              ...ctrl,
              ...(layout !== undefined ? { layout } : {}),
              ...(columns !== undefined ? { columns } : {}),
              config: {
                ...ctrl.config,
                ...configUpdates,
              }
            };
          }
          if (ctrl.children) {
            return {
              ...ctrl,
              children: updateControlTree(ctrl.children)
            };
          }
          return ctrl;
        });
      }
      setDroppedControls(prev => updateControlTree(prev));
    };

  const handleSettingsUpdate = (updates: Record<string, any>) => {
      if (!selectedControlId) return;
      setDroppedControls(prev =>
        updateControlConfigRecursive(prev, selectedControlId, updates)
      );
    };

  // Persist dropped controls to localStorage
  useEffect(() => {
    localStorage.setItem('djinni:droppedControls', JSON.stringify(droppedControls));
  }, [droppedControls]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab as 'designer' | 'code' | 'settings');
  };

  const findControlById = (controls: DroppedControl[], id: string | null): DroppedControl | null => {
      if (!id) return null;

      for (const ctrl of controls) {
        if (ctrl.id === id) return ctrl;
        if (ctrl.children) {
          const found = findControlById(ctrl.children, id);
          if (found) return found;
        }
      }

      return null;
    };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column' }}>
      <IconTabs
        items={TABS}
        value={tab}
        onChange={handleTabChange}
        tabPosition="right"
      >
          <Box sx={{ display: 'flex', height: '200', position: 'relative' }}>
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
                right: showSidebar ? 0 : 0,
                transform: 'translateY(-100%)',
                zIndex: 1000,
                p: 0.1,
                height: 30,
                width: 30,
                backgroundColor: 'grey.50',
                border: '1px solid #grey.300',
                borderRadius: 50,
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
                  overflowY: 'auto',
                }}
              >
                <SettingsPanel
                    selectedControl={findControlById(droppedControls, selectedControlId)}
                    setDroppedControls={setDroppedControls}
                    onUpdate={handleSettingsUpdate}                    
                  />
              </Box>
            </Slide>
          </Box>

        {/* 2nd child: Code View */}
        <Box sx={{ height: '100%' }}>
          <CodeEditor />
        </Box>

        {/* 3rd child: Settings */}
        <Box sx={{ height: '100%' }}>
          <Settings />
        </Box>
      </IconTabs>
    </Box>
  );
}
