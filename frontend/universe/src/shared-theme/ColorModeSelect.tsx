import * as React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { SxProps } from '@mui/system';


interface ColorModeSelectProps {
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  sx?: SxProps;
}

const ColorModeSelect: React.FC<ColorModeSelectProps> = ({ onThemeChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onThemeChange(event.target.value as 'light' | 'dark' | 'system'); // Notify parent of theme change
  };

  return (
    <Select onChange={handleChange} defaultValue="light">
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
      <MenuItem value="system">System</MenuItem>
    </Select>
  );
};

export default ColorModeSelect;
