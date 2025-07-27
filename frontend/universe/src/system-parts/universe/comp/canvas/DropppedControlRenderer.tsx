import React from 'react';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormLabel,
  Radio,
  TextareaAutosize,
  Switch,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { DroppedControl } from '../../../types/Canvas';

type Props = {
  control: DroppedControl;
};

export default function DroppedControlRenderer({ control }: Props) {
  switch (control.type) {
    case 'text':
      return <TextField size="small" label={control.label || 'Text Field'} fullWidth />;

    case 'dropdown':
      return (
        <FormControl fullWidth size="small">
          <InputLabel>{control.label || 'Dropdown'}</InputLabel>
          <Select defaultValue="">
            {(control.options || ['Option 1', 'Option 2']).map((opt, idx) => (
              <MenuItem key={idx} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'date':
      return <TextField type="date" size="small" fullWidth label={control.label || 'Date'} />;

    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox />}
          label={control.label || 'Check me'}
        />
      );

    case 'radio':
      return (
        <FormControl>
          <FormLabel>{control.label || 'Radio Group'}</FormLabel>
          <RadioGroup row>
            {(control.options || ['Option A', 'Option B']).map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio size="small" />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'textarea':
      return (
        <FormControl fullWidth>
          <FormLabel>{control.label || 'Textarea'}</FormLabel>
          <TextareaAutosize
            minRows={3}
            placeholder="Enter text..."
            style={{
              width: '100%',
              fontSize: 13,
              padding: 8,
              borderRadius: 4,
              borderColor: '#ccc',
            }}
          />
        </FormControl>
      );

    case 'signature':
      return (
        <Box>
          <Typography fontSize={12} fontWeight={400} gutterBottom>
            {control.label || 'Signature'}
          </Typography>
          <Box
            sx={{
              border: '1px dashed #aaa',
              height: 80,
              borderRadius: 0.5,
              backgroundColor: '#f9f9f9',
            }}
          />
        </Box>
      );

    case 'upload':
      return (
        <Box>
          <Typography fontSize={12} fontWeight={400} gutterBottom>
            {control.label || 'Upload File'}
          </Typography>
          <Button variant="outlined" size="small" component="label">
            Choose File
            <input type="file" hidden />
          </Button>
        </Box>
      );

    case 'toggle':
      return (
        <FormControlLabel
          control={<Switch size="small" />}
          label={control.label || 'Toggle'}
        />
      );
     case 'button':
        return (
            <Button variant="outlined" size="small" disabled fullWidth>
            {control.label || 'Click Me'}
            </Button>
        );

     case 'header':
        return (
            <Typography variant="h6" fontWeight={600}>
            {control.label || 'Header'}
            </Typography>
        );

     case 'image':
        return (
            <Box>
            <Typography fontSize={12} fontWeight={400} gutterBottom>
                {control.label || 'Image'}
            </Typography>
            <Box
                component="img"
                src="https://via.placeholder.com/150"
                alt="Static"
                sx={{ width: '100%', borderRadius: 0.5 }}
            />
            </Box>
        );

     case 'label':
        return <Typography fontSize={13}>{control.label || 'Label text'}</Typography>;

     case 'link':
        return (
            <Typography
            fontSize={13}
            color="primary"
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            >
            {control.label || 'Visit link'}
            </Typography>
        );

     case 'qrcode':
        return (
            <Box textAlign="center">
            <Typography fontSize={12} gutterBottom>
                {control.label || 'QR Code'}
            </Typography>
            <Box
                component="img"
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=HelloWorld"
                alt="QR Code"
                sx={{ width: 100, height: 100 }}
            />
            </Box>
        );

     case 'static':
        return (
            <Typography fontSize={13} sx={{ whiteSpace: 'pre-line' }}>
            {control.label || 'This is static content.\nIt doesn’t do anything.'}
            </Typography>
        );

    case 'card':
        return (
            <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: 1,
                p: 1,
                backgroundColor: '#fafafa',
                width: '100%',
            }}
            >
            <Typography fontSize={12} fontWeight={500} gutterBottom>
                {control.label || 'Card'}
            </Typography>
            <Typography fontSize={11} color="text.secondary">
                (Drag controls here in future)
            </Typography>
            </Box>
        );

        case 'container':
        return (
            <Box
            sx={{
                border: '1px dashed #aaa',
                borderRadius: 0.5,
                p: 1,
                backgroundColor: '#f0f0f0',
                width: '100%',
            }}
            >
            <Typography fontSize={12} fontWeight={500} gutterBottom>
                {control.label || 'Container'}
            </Typography>
            </Box>
        );

        case 'repeater':
        return (
            <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: 1,
                p: 1,
                backgroundColor: '#fffbe6',
                width: '100%',
            }}
            >
            <Typography fontSize={12} fontWeight={500}>
                {control.label || 'Repeater'}
            </Typography>
            <Typography fontSize={11} color="text.secondary">
                Repeats a set of inputs per item.
            </Typography>
            </Box>
        );

        case 'table':
        return (
            <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: '#fff',
                p: 1,
                width: '100%',
            }}
            >
            <Typography fontSize={12} fontWeight={500} gutterBottom>
                {control.label || 'Table'}
            </Typography>
            <Typography fontSize={11} color="text.secondary">
                Structured grid layout coming soon.
            </Typography>
            </Box>
        );

        case 'tab':
        return (
            <Box
            sx={{
                border: '1px solid #bbb',
                borderRadius: 1,
                p: 1,
                backgroundColor: '#f5f5f5',
            }}
            >
            <Typography fontSize={12} fontWeight={500} gutterBottom>
                {control.label || 'Tab Set'}
            </Typography>
            <Box display="flex" gap={1} mt={0.5}>
                <Box
                sx={{
                    px: 1,
                    py: 0.5,
                    fontSize: 11,
                    backgroundColor: '#ddd',
                    borderRadius: 0.5,
                }}
                >
                Tab 1
                </Box>
                <Box
                sx={{
                    px: 1,
                    py: 0.5,
                    fontSize: 11,
                    backgroundColor: '#eee',
                    borderRadius: 0.5,
                }}
                >
                Tab 2
                </Box>
            </Box>
            </Box>
        );

        case 'wizard':
        return (
            <Box
            sx={{
                border: '2px dashed #aaa',
                borderRadius: 1,
                p: 1,
                backgroundColor: '#f9f9f9',
            }}
            >
            <Typography fontSize={12} fontWeight={600}>
                {control.label || 'Wizard Container'}
            </Typography>
            <Typography fontSize={11} color="text.secondary">
                (Steps go here)
            </Typography>
            </Box>
        );

        case 'wizard_step':
        return (
            <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                p: 1,
                backgroundColor: '#fff',
            }}
            >
            <Typography fontSize={12} fontWeight={500}>
                {control.label || 'Wizard Step'}
            </Typography>
            </Box>
        );



    default:
      return null;
  }
}
