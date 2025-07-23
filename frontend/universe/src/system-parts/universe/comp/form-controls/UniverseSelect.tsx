// components/form-controls/UniverseSelect.tsx
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormHelperText,
  Typography,
  Box,
} from '@mui/material';

interface UniverseSelectProps extends Omit<SelectProps, 'label'> {
  labelText?: string;
  options: { label: string; value: any }[];
  errorText?: string;
}

export default function UniverseSelect({
  labelText,
  options,
  error,
  errorText,
  ...props
}: UniverseSelectProps) {
  return (
    <Box mb={2}>
      {labelText && (
        <Typography
          fontSize={14}
          fontWeight={400}
          mb={0.5}
          sx={{ color: '#333' }}
        >
          {labelText}
        </Typography>
      )}

      <FormControl fullWidth error={!!error}>
        <Select
          variant="outlined"
          displayEmpty
          {...props}
          sx={{
            borderRadius: 0.5,
            fontSize: 14,
            fontWeight: 400,
            height:30,
            px:1,
            backgroundColor: 'grey.100',
            border: '1px solid',
            borderColor: 'grey.400',
            boxShadow: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c4c4c4',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            ...props.sx,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && errorText && (
          <FormHelperText>{errorText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
