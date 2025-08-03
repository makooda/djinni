import React, { useState } from 'react';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container
} from '@mui/material';
import { DroppedControl } from '../wrappers/FormsBuilderWrapper';
import CardControl from '../canvas/controls/CardControl';

type Props = {
  control: DroppedControl;
  children?: React.ReactNode;
};

export default function DroppedControlRenderer({ control, children }: Props) {
  switch (control.type) { // Removed isAbsolute as it's not defined in this scope
    case 'text':
      return <TextField size="small" label={control.label || 'Text Field'} fullWidth />;

    case 'dropdown':
      return (
        <FormControl fullWidth size="small">
          <InputLabel>{control.label || 'Dropdown'}</InputLabel>
          <Select defaultValue="">
            {((control.config?.options as string[]) || ['Option 1', 'Option 2']).map((opt, idx) => (
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
            {((control.config?.options as string[]) || ['Option A', 'Option B']).map((opt, idx) => (
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
    case 'card': {
      return (
          <CardControl control={control}>
            {children}
          </CardControl>
      );
    }
    case 'container': {      
 return <CardControl control={control}>{children}</CardControl>;
    }
    case 'repeater': {
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
          {control.label && (
            <Typography fontSize={12} fontWeight={500} gutterBottom>
              {control.label}
            </Typography>
          )}
          <Button size="small" variant="outlined" sx={{ mb: 1, fontSize: 12, fontWeight: 400 }}>
            + Add Item
          </Button>
          {/* children rendered below */}
        </Box>
      );
    }
    case 'table': {
      return (
        <TableContainer component={Paper} variant="outlined" sx={{ width: '100%' }}>
          {control.label && (
            <Typography fontSize={12} fontWeight={500} sx={{ p: 1 }}>
              {control.label}
            </Typography>
          )}
          <Table size="small">
            <TableHead>
              <TableRow>
                {(control.children || []).map((col, idx) => (
                  <TableCell key={idx} sx={{ fontSize: 12, fontWeight: 400 }}>
                    {col.label || `Col ${idx + 1}`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {(control.children || []).map((_, idx) => (
                  <TableCell key={idx} sx={{ fontSize: 12, fontWeight: 400 }}>
                    —
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    case 'tab': {
      const [value, setValue] = useState(0);
      return (
        <Box sx={{ width: '100%' }}>
          {control.label && (
            <Typography fontSize={12} fontWeight={500} gutterBottom>
              {control.label}
            </Typography>
          )}
          <Tabs
            value={value}
            onChange={(_, v) => setValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 1 }}
          >
            {(control.children || []).map((tab, idx) => (
              <Tab key={idx} label={tab.label || `Tab ${idx + 1}`} sx={{ fontSize: 12, fontWeight: 400 }} />
            ))}
          </Tabs>
          <Box sx={{ p: 1 }}>
            {/* render only the active child */}
            {(control.children || [])[value] ? (
              <DroppedControlRenderer control={(control.children || [])[value]} />
            ) : (
              <Typography fontSize={11} color="text.secondary">
                Empty tab
              </Typography>
            )}
          </Box>
        </Box>
      );
    }
    case 'wizard': {
      const [activeStep, setActiveStep] = useState(0);
      const steps = (control.children || []).map((step) => step.label || 'Step');
      return (
        <Box sx={{ width: '100%' }}>
          {control.label && (
            <Typography fontSize={12} fontWeight={500} gutterBottom>
              {control.label}
            </Typography>
          )}
          <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
            {steps.map((label, idx) => (
              <Step key={idx}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 12, fontWeight: 400 } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ p: 1 }}>
            {control.children && control.children[activeStep] ? (
              <DroppedControlRenderer control={control.children[activeStep]} />
            ) : (
              <Typography fontSize={11} color="text.secondary">
                Empty step
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button
                size="small"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
                sx={{ fontSize: 12, fontWeight: 400, textTransform: 'none' }}
              >
                Back
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() =>
                  setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
                }
                sx={{ fontSize: 12, fontWeight: 400, textTransform: 'none' }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      );
    }
    default:
      return null;
  }
}
