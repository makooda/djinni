import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface SettingsPanelProps {
  selectedControlId: string | null;
  droppedControls: any[];
  onUpdate: (updatedControls: any[]) => void;
}

export default function SettingsPanel({
  selectedControlId,
  droppedControls,
  onUpdate,
}: SettingsPanelProps) {
  const selected = droppedControls.find((ctrl) => ctrl.id === selectedControlId);

  const handleChange = (key: string, value: any) => {
    const updated = droppedControls.map((ctrl) =>
      ctrl.id === selectedControlId ? { ...ctrl, config: { ...ctrl.config, [key]: value } } : ctrl
    );
    onUpdate(updated);
  };

  if (!selected) {
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
          Components Settings
        </Typography>
        <Typography mt={2} fontSize={12}>
          Select a control on the canvas to configure its settings.
        </Typography>
      </Box>
    );
  }

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
      <Typography variant="caption" fontSize={13} fontWeight={500}
      >
        {selected.label || 'Component'} Settings
      </Typography>

      {/* Example fields – extend based on type */}
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        {['text', 'textarea', 'header', 'label'].includes(selected.type) && (
          <TextField
            label="Label"
            size="small"
            fullWidth
            value={selected.config?.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        )}

        {selected.type === 'dropdown' && (
          <FormControl fullWidth size="small">
            <InputLabel>Default Value</InputLabel>
            <Select
              value={selected.config?.default || ''}
              onChange={(e) => handleChange('default', e.target.value)}
            >
              {(selected.config?.options || []).map((opt: string, index: number) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selected.type === 'toggle' && (
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={selected.config?.default || false}
                onChange={(e) => handleChange('default', e.target.checked)}
              />
            }
            label="Default Checked"
          />
        )}
      </Box>
    </Box>
  );
}
