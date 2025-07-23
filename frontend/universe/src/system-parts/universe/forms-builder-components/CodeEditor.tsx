// components/form-builder/CodeEditor.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';

export default function CodeEditor() {
  const [code, setCode] = useState(`{
  "fields": [
    { "type": "text", "label": "First Name" },
    { "type": "email", "label": "Email Address" }
  ]
}`);

  return (
    <Paper
      variant="outlined"
      sx={{
        flexGrow: 1,
        p: 2,
        backgroundColor: '#0f0f0f',
        color: 'white',
        fontFamily: 'monospace',
        minHeight: 300,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.300' }}>
        Form JSON
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        variant="outlined"
        InputProps={{
          sx: {
            fontFamily: 'monospace',
            color: 'white',
            backgroundColor: '#1e1e1e',
          },
        }}
      />
    </Paper>
  );
}
