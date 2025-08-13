import React from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { controlSettingsSchema } from '../schemas/FormControlSettingsSchema'; // Your schema file

const displayNames: Record<string, string> = {
  text: 'Text Field',
  dropdown: 'Dropdown',
  date: 'Date Picker',
  checkbox: 'Checkbox',
  radio: 'Radio Group',
  textarea: 'Textarea',
  signature: 'Signature',
  upload: 'Uploader',
  toggle: 'Toggle',
  button: 'Button',
  header: 'Header',
  image: 'Image',
  label: 'Label',
  link: 'Link',
  qrcode: 'QR Code',
  static: 'Static Content',
  card: 'Card',
  container: 'Container',
  repeater: 'Repeater',
  table: 'Table',
  tab: 'Tab',
  wizard: 'Wizard',
  wizard_step: 'Wizard Step',
};

const CONTAINER_TYPES = [
  'card', 'container', 'repeater', 'table', 'tab', 'wizard', 'wizard_step'
];

type SettingsPanelProps = {
  selectedControl: any; // your DroppedControl type
  setDroppedControls: (setter: any) => void;
  onUpdate: (updates: Record<string, any>) => void;
};

export default function SettingsPanel({
  selectedControl,
  setDroppedControls,
  onUpdate,
}: SettingsPanelProps) {
  if (!selectedControl) {
    return (
      <Box sx={{ p: 2, color: 'grey.500' }}>
        <Typography fontSize={13}>Select a control to edit settings</Typography>
      </Box>
    );
  }

  const controlType = selectedControl.type;
  const displayName =    displayNames[controlType] || controlType.charAt(0).toUpperCase() + controlType.slice(1);
  const settingsFields = controlSettingsSchema[controlType] || [];

  const parseValueWithUnit = (value: string = '', units: string[] = []) => {
      if (!value) return { num: '', unit: units[0] || '' };
      const match = value.match(/^(\d*\.?\d*)(\D*)$/);
      let num = match?.[1] || '';
      let unit = match?.[2] || units[0] || '';
      // If unit is missing or not in allowed units, fallback
      if (!units.includes(unit)) unit = units[0] || '';
      return { num, unit };
    };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'grey.200',
          px: 1,
          py: 1,
          borderRadius: 0.5,
          height: 30,
          mb: 1,
        }}
      >
        <Typography fontSize={13} fontWeight={500}>
          {displayName} Settings
        </Typography>
      </Box>

      {/* Settings Fields */}
      <Box sx={{ px: 0.5 }}>
        {settingsFields.length === 0 && (
          <Typography fontSize={12} color="text.secondary" sx={{ mb: 1 }}>
            No settings available for this control.
          </Typography>
        )}

        {settingsFields.map((field) => {
          // current value: prefer config, fallback to control root
          const value =
            selectedControl.config?.[field.key] ?? selectedControl[field.key] ?? '';
          if (field.type === 'text') {
            return (
              <TextField
                key={field.key}
                label={field.label}
                value={value}
                onChange={e =>
                  onUpdate({ [field.key]: e.target.value })
                }
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                InputLabelProps={{ shrink: true }}
              />
            );
          }
          if (field.type === 'boolean') {
            return (
              <FormControlLabel
                key={field.key}
                control={
                  <Switch
                    checked={!!value}
                    onChange={e =>
                      onUpdate({ [field.key]: e.target.checked })
                    }
                    size="small"
                  />
                }
                label={field.label}
                sx={{ mb: 0.5, ml: 0.3 }}
              />
            );
          }
          if (field.type === 'select') {
            return (
              <FormControl key={field.key} size="small" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={value}
                  label={field.label}
                  onChange={e =>
                    onUpdate({ [field.key]: e.target.value })
                  }
                >
                  {(field.options || []).map(opt => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          // ---- Color Picker ----
          if (field.type === 'color') {
            return (
              <Box key={field.key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  label={field.label}
                  type="color"
                  value={value || '#ffffff'}
                  onChange={e => onUpdate({ [field.key]: e.target.value })}
                  size="small"
                  sx={{
                    width: 40,
                    p: 0,
                    '& input': { p: 0.5, minWidth: 30, bgcolor: 'transparent', cursor: 'pointer' },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography sx={{ ml: 2 }}>{value}</Typography>
              </Box>
            );
          }
          // ---- Text field with units ----
          if (field.type === 'text' && field.unitOptions && field.unitOptions.length) {
          // Split value into num/unit
          let num = '';
          let unit = field.unitOptions[0];
          const match = value ? value.match(/^(\d*\.?\d*)(\D*)$/) : null;
          if (match) {
            num = match[1] || '';
            unit = match[2] || field.unitOptions[0];
            if (!field.unitOptions.includes(unit)) unit = field.unitOptions[0];
          }

          return (
            <Box key={field.key} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                label={field.label}
                value={num}
                type="number"
                size="small"
                onChange={e => {
                  onUpdate({ [field.key]: e.target.value + unit });
                }}
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
              />
              <FormControl size="small" sx={{ minWidth: 60 }}>
                <Select
                  value={unit}
                  onChange={e => {
                    onUpdate({ [field.key]: num + e.target.value });
                  }}
                >
                  {field.unitOptions.map(u => (
                    <MenuItem key={u} value={u}>{u}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        }
          return null;
        })}

        {/* Divider for container special settings */}
        {CONTAINER_TYPES.includes(controlType) && (
          <>
            <Divider sx={{ my: 1 }} />
            {/* Layout Option */}
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel>Layout</InputLabel>
              <Select
                value={selectedControl.layout || 'column'}
                label="Layout"
                onChange={e => onUpdate({ layout: e.target.value })}
              >
                <MenuItem value="column">Column (Stacked)</MenuItem>
                <MenuItem value="row">Row (Side by Side)</MenuItem>
                <MenuItem value="grid">Grid</MenuItem>
              </Select>
            </FormControl>
            {selectedControl.layout === 'grid' && (
              <TextField
                label="Columns"
                type="number"
                size="small"
                value={selectedControl.columns || 2}
                onChange={e => onUpdate({ columns: Number(e.target.value) })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
