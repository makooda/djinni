// components/form-builder/PreviewCanvas.tsx
import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

export default function PreviewCanvas() {
  return (
    <Paper
      variant="outlined"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: 300,
      }}
    >
      <Typography variant="h6">Form Preview</Typography>
      <TextField fullWidth label="First Name" />
      <TextField fullWidth label="Email Address" />
      <Button variant="contained">Submit</Button>
    </Paper>
  );
}
