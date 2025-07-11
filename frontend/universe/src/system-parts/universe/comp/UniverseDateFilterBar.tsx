// src/comp/DateFilterBar.tsx
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface Props {
  onDateFilterChange: (range: { start: Date | null; end: Date | null } | null) => void;
}

export default function DateFilterBar({ onDateFilterChange }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customRange, setCustomRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const handleFilter = (type: string) => {
    setSelected(type);
    setAnchorEl(null);
    switch (type) {
      case 'today':
        onDateFilterChange({
          start: new Date(new Date().setHours(0, 0, 0, 0)),
          end: new Date(new Date().setHours(23, 59, 59, 999)),
        });
        break;
      case 'week':
        onDateFilterChange({ start: startOfWeek, end: endOfWeek });
        break;
      case 'month':
        onDateFilterChange({ start: startOfMonth, end: endOfMonth });
        break;
    }
  };

  const handleCustomOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSelected('custom');
  };

  const handleCustomApply = () => {
    const start = customRange.start ? new Date(customRange.start) : null;
    const end = customRange.end ? new Date(customRange.end) : null;
    if (start && end) onDateFilterChange({ start, end });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title="Custom Date Range">
        <IconButton
          onClick={handleCustomOpen}
          color={selected === 'custom' ? 'primary' : 'default'}
        >
          <DateRangeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Today">
        <IconButton
          onClick={() => handleFilter('today')}
          color={selected === 'today' ? 'primary' : 'default'}
        >
          <TodayIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="This Week">
        <IconButton
          onClick={() => handleFilter('week')}
          color={selected === 'week' ? 'primary' : 'default'}
        >
          <EventNoteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="This Month">
        <IconButton
          onClick={() => handleFilter('month')}
          color={selected === 'month' ? 'primary' : 'default'}
        >
          <CalendarMonthIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={open && selected === 'custom'}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          <Typography variant="subtitle2">Select Date Range</Typography>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={customRange.start}
            onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
            size="small"
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={customRange.end}
            onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
            size="small"
          />
          <Button onClick={handleCustomApply} variant="contained" size="small">
            Apply
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
