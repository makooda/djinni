import React, { useState } from 'react';
import { Box, Typography, Paper, FormControlLabel, Switch } from '@mui/material';
import FormsControlPalette from './FormsControlPanel';
import PreviewCanvas from './PreviewCanvas';

export default function DragAndDropCanvas() {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        flexGrow: 1,
        p: 1,
        border: '0.5px dashed grey',
        backgroundColor: 'white',
        minHeight: 300,
        borderRadius: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* Forms Control Palette Toolbar */}
      <FormsControlPalette />

      {/* Preview Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isPreview}
              size="small"
              onChange={(e) => setIsPreview(e.target.checked)}
            />
          }
          label="Preview Form"
          labelPlacement="start"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: 13,
              fontWeight: 400,
            },
          }}
        />
      </Box>

      {/* Canvas Area */}
      <Box
        sx={{
          flexGrow: 1,
          border: '1px dashed #ccc',
          borderRadius: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.50',
          p:0.5
        }}
      >
        {isPreview ? (
          <PreviewCanvas />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Drag form controls here to build your form
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
