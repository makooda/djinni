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
  Divider,
} from '@mui/material';
import { DroppedControl } from './FormsBuilderWrapper';

interface Props {
  control: DroppedControl;
  onChange: (key: string, value: any) => void;
}

export default function ControlSettingsRenderer({ control, onChange }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2} px={1} py={1}>
      {/* Label Configuration */}
      {['text', 'textarea', 'header', 'label', 'button'].includes(control.type) && (
        <TextField
          label="Label"
          size="small"
          fullWidth
          value={control.config?.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
        />
      )}

      {/* Options Configuration for dropdown & radio */}
      {['dropdown', 'radio'].includes(control.type) && (
        <TextField
          label="Options (one per line)"
          size="small"
          multiline
          minRows={3}
          fullWidth
          value={(control.config?.options || []).join('\n')}
          onChange={(e) => {
            const opts = e.target.value
              .split('\n')
              .map((o) => o.trim())
              .filter((o) => o);
            onChange('options', opts);
          }}
        />
      )}

      {/* Default Value for dropdown */}
      {['dropdown'].includes(control.type) && (
        <FormControl fullWidth size="small">
          <InputLabel>Default Value</InputLabel>
          <Select
            value={control.config?.default || ''}
            onChange={(e) => onChange('default', e.target.value)}
          >
            {(control.config?.options || []).map((opt: string, idx: number) => (
              <MenuItem key={idx} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Default Checked for toggle & checkbox */}
      {['toggle', 'checkbox'].includes(control.type) && (
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={!!control.config?.default}
              onChange={(e) => onChange('default', e.target.checked)}
            />
          }
          label="Default Checked"
        />
      )}

      {/* Static Content Editor */}
      {control.type === 'static' && (
        <TextField
          label="Content"
          size="small"
          multiline
          minRows={3}
          fullWidth
          value={control.config?.content || ''}
          onChange={(e) => onChange('content', e.target.value)}
        />
      )}

      {/* Image URL for image control */}
      {control.type === 'image' && (
        <TextField
          label="Image URL"
          size="small"
          fullWidth
          value={control.config?.src || ''}
          onChange={(e) => onChange('src', e.target.value)}
        />
      )}

      {/* Link URL and Text */}
      {control.type === 'link' && (
        <>
          <TextField
            label="Link Text"
            size="small"
            fullWidth
            value={control.config?.label || ''}
            onChange={(e) => onChange('label', e.target.value)}
          />
          <TextField
            label="URL"
            size="small"
            fullWidth
            value={control.config?.href || ''}
            onChange={(e) => onChange('href', e.target.value)}
          />
        </>
      )}

      {/* QR Code Data */}
      {control.type === 'qrcode' && (
        <TextField
          label="QR Data"
          size="small"
          fullWidth
          value={control.config?.data || ''}
          onChange={(e) => onChange('data', e.target.value)}
        />
      )}

      {/* Style Configuration for all controls */}
      <Divider />
      <Typography variant="subtitle2" fontWeight={500} gutterBottom>
        Styling
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        <TextField
          label="Background Color"
          size="small"
          fullWidth
          value={control.config?.style?.bgcolor || ''}
          onChange={(e) =>
            onChange('style', {
              ...(control.config?.style || {}),
              bgcolor: e.target.value,
            })
          }
        />
        <TextField
          label="Border Radius"
          size="small"
          type="number"
          fullWidth
          value={control.config?.style?.borderRadius || ''}
          onChange={(e) =>
            onChange('style', {
              ...(control.config?.style || {}),
              borderRadius: Number(e.target.value),
            })
          }
        />
        <TextField
          label="Padding"
          size="small"
          type="number"
          fullWidth
          value={control.config?.style?.p || ''}
          onChange={(e) =>
            onChange('style', {
              ...(control.config?.style || {}),
              p: Number(e.target.value),
            })
          }
        />
      </Box>

      {/* Placeholder for advanced controls */}
      <Divider />
      {['card', 'container', 'repeater', 'table', 'tab', 'wizard', 'wizard_step'].includes(
        control.type
      ) && (
        <Typography variant="caption" color="text.secondary">
          No configurable properties for {control.type} yet.
        </Typography>
      )}
    </Box>
  );
}
