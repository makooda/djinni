// components/form-controls/UniverseCheckbox.tsx
import React from 'react';
import {
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  Typography,
  Box,
} from '@mui/material';

interface UniverseCheckboxProps extends CheckboxProps {
  label: string;
}

export default function UniverseCheckbox({ label, ...props }: UniverseCheckboxProps) {
  return (
    <Box mb={1}>
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            sx={{
              color: '#c4c4c4',
              '&.Mui-checked': {
                color: '#1976d2',
              },
              ...props.sx,
            }}
          />
        }
        label={
          <Typography fontSize={12} fontWeight={500}>
            {label}
          </Typography>
        }
      />
    </Box>
  );
}
