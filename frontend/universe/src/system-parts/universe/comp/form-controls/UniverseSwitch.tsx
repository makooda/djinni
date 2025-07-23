import React from 'react';
import { FormControlLabel, Switch, Typography, SwitchProps, Box } from '@mui/material';

interface UniverseSwitchProps extends SwitchProps {
  label: string;
}

export function UniverseSwitch({ label, ...props }: UniverseSwitchProps) {
  return (
    <Box mb={1}>
      <FormControlLabel
        control={
          <Switch
            {...props}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#1976d2',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#1976d2',
              },
              ...props.sx,
            }}
          />
        }
        label={<Typography fontSize={12} fontWeight={500}>{label}</Typography>}
      />
    </Box>
  );
}