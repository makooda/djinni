// components/form-controls/UniverseTextField.tsx
import React from 'react';
import { TextField, TextFieldProps, Typography, Box } from '@mui/material';
 
interface UniverseTextFieldProps extends Omit<TextFieldProps, 'label'> {
  labelText?: string | React.ReactNode;
}

export default function UniverseTextField({
  labelText,
  ...props
}: UniverseTextFieldProps) {
  return (
    <Box mb={2}>
      {labelText && (
        <Typography
          fontSize={14}
          fontWeight={400}
          marginBottom={0.5}
          sx={{ color: '#333' }}
        >
          {labelText}
        </Typography>
      )}
      <TextField
        fullWidth
        variant="outlined"
        inputRef={props.inputRef}
        InputProps={{
          ...props.InputProps,
        }}
        inputProps={{
          ...props.inputProps, 
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0.5,
            fontSize: 14,
            fontWeight: 400,
            height:30,
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
            },
          },
          ...props.sx,
        }}
      />
    </Box>
  );
}
