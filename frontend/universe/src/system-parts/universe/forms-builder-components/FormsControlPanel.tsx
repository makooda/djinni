import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  Tooltip,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ListIcon from '@mui/icons-material/List';

const controls = [
  { type: 'text', label: 'TextField', icon: <TextFieldsIcon fontSize="small" /> },
  { type: 'dropdown', label: 'Dropdown', icon: <ListIcon fontSize="small" /> },
  { type: 'date', label: 'Date Picker', icon: <CalendarMonthIcon fontSize="small" /> },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckBoxIcon fontSize="small" /> },
];

export default function FormsControlPalette() {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => setExpanded(prev => !prev);

  return (
    <Box>
      {/* Header with toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          mb: 1,
        }}
      >
        <Typography variant="caption" fontSize={13} fontWeight={500}>
            Components Palette
        </Typography>

        <IconButton
            size="small"
            onClick={handleToggle}
            disableRipple
            sx={{
                border: 'none',
                p: 0.5,
                backgroundColor: 'transparent',
                '&:hover': {
                backgroundColor: 'transparent',
                },
            }}
            >
            {expanded ? (
                <ArrowDropDownIcon fontSize="small" />
            ) : (
                <ArrowRightIcon fontSize="small" />
            )}
        </IconButton>

      </Box>

      {/* Draggable Items */}
      <Collapse in={expanded}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: 1,
            py: 0.5,
          }}
        >
          {controls.map((ctrl) => (
            <Tooltip key={ctrl.type} title={ctrl.label} arrow>
              <Box
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('control-type', ctrl.type);
                }}
                sx={{
                  px: 1,
                  py: 0.5,
                  fontSize: 12,
                  fontWeight: 500,
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: 'grey.400',
                  borderRadius: 0.5,
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {ctrl.icon}
                {ctrl.label}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
