// components/form-controls/UniverseRadio.tsx
import React from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Box,
  FormLabel,
  RadioGroupProps,
} from '@mui/material';

interface UniverseRadioProps extends RadioGroupProps {
  labelText?: string;
  options: { label: string; value: any }[];
}

export default function UniverseRadio({ labelText, options, ...props }: UniverseRadioProps) {
  return (
    <Box mb={2}>
      {labelText && (
        <Typography fontSize={12} fontWeight={600} mb={0.5}>
          {labelText}
        </Typography>
      )}
      <FormControl component="fieldset">
        <RadioGroup {...props}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio
                  sx={{
                    color: '#c4c4c4',
                    '&.Mui-checked': {
                      color: '#1976d2',
                    },
                  }}
                />
              }
              label={
                <Typography fontSize={12} fontWeight={400}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
