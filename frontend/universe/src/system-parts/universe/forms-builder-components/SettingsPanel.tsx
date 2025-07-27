import React from 'react';
import { Box, Typography } from '@mui/material';
import ControlSettingsRenderer from './ControlSettingsRenderer';
import { DroppedControl } from './FormsBuilderWrapper';

interface SettingsPanelProps {
  selectedControl: DroppedControl | null;
  setDroppedControls: React.Dispatch<React.SetStateAction<DroppedControl[]>>;
}

export default function SettingsPanel({
  selectedControl,
  setDroppedControls,
}: SettingsPanelProps) {
  if (!selectedControl) {
    return (
      <Box 
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          height: 30,
        }}
      >
        <Typography variant="caption" fontSize={13} fontWeight={500}>
          Component Settings
        </Typography>
        <Typography mt={2} fontSize={12} color="text.secondary">
          Select a control on the canvas to configure its settings.
        </Typography>
      </Box>
    );
  }

  const handleConfigChange = (key: string, value: any) => {
    setDroppedControls((prev) =>
      prev.map((ctrl) =>
        ctrl.id === selectedControl.id
          ? { ...ctrl, config: { ...(ctrl.config || {}), [key]: value } }
          : ctrl
      )
    );
  };

  return (
    <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          height: 30,
        }}
    >
      <Typography variant="caption" fontSize={13} fontWeight={500} gutterBottom>
        {selectedControl.label || selectedControl.type} Settings
      </Typography>

      <ControlSettingsRenderer
        control={selectedControl}
        onChange={handleConfigChange}
      />
    </Box>
  );
}
