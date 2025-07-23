import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import UniverseTextField from './UniverseTextField';

interface UniverseDatePickerProps {
  labelText?: string;
  [key: string]: any;
}

export default function UniverseDatePicker({ labelText, ...props }: UniverseDatePickerProps) {
  return (
    <DatePicker
      {...props}
      enableAccessibleFieldDOMStructure={false}
      slots={{
        textField: (params) => (
          <UniverseTextField
            {...params}
            labelText={labelText}
            inputProps={{
              ...params.inputProps,
              readOnly: true, 
            }}
          />
        ),
      }}
    />
  );
}
