import React from 'react';
import { TextField, TextFieldProps, Typography, Box } from '@mui/material';

interface UniverseTextAreaProps extends Omit<TextFieldProps, 'label'> {
  label: string
}

export function UniverseTextArea({
  label, 
  ...props 
}: UniverseTextAreaProps) {
  return (
    <Box mb={2}>
        <Typography
          fontSize={14}
          fontWeight={400}
          marginBottom={0.5}
          sx={{ color: '#333' }}
        >
          {label}
        </Typography>
      <TextField
        {...props}
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0.5,
            px:1,
            backgroundColor: 'grey.100',
            border: '1px solid',
            borderColor: 'grey.400',
            boxShadow: 'none',
            '& fieldset': {
              borderColor: '#c4c4c4',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            }
          },
          ...props.sx,
        }}
      />
    </Box>
  );
}
