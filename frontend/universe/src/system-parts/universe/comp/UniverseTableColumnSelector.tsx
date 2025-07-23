import React, { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Switch,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Column = {
  label: string;
  key: string;
};

type ColumnSelectorProps = {
  columns: Column[];
  visibleColumns: string[];
  onChange: (selected: string[]) => void;
  storageKey?: string;
};

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  visibleColumns,
  onChange,
  storageKey = 'table-column-visibility',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        onChange(JSON.parse(saved));
      } catch {}
    }
  }, [storageKey, onChange]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, storageKey]);

  const toggleColumn = (key: string) => {
    const updated = visibleColumns.includes(key)
      ? visibleColumns.filter((k) => k !== key)
      : [...visibleColumns, key];
    onChange(updated);
  };

  const selectAll = () => onChange(columns.map((c) => c.key));
  const clearAll = () => onChange([]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 400, fontSize: 12 }}>
        Columns:
      </Typography>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
        size="small"
        sx={{
          textTransform: 'none',
          fontWeight: 400,
          fontSize: 12,
          maxHeight:30,
          borderRadius: 0.5,
          color: 'text.primary',
          borderColor: 'grey.400',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'grey.100',
          },
        }}
      >
        Select
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#f5f5f5',
            border: '1px solid #bdbdbd',
            borderRadius: 1,
            minWidth: 180,
            boxShadow: 3,
            textTransform: 'uppercase',
            fontSize: '11',
          },
        }}
      >
        <Box px={2} pb={1}>
          <Button onClick={selectAll} size="small">Select All</Button>
          <Button onClick={clearAll} size="small" color="error">Clear All</Button>
        </Box>
        <Divider />
        {columns.map((col) => (
          <MenuItem
            key={col.key}
            onClick={() => toggleColumn(col.key)}
            disableRipple
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingY: 1,
            }}
          >
            <ListItemText primary={col.label} />
            <Switch
              edge="end"
              size="small"
              checked={visibleColumns.includes(col.key)}
              onChange={() => {}}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ColumnSelector;
