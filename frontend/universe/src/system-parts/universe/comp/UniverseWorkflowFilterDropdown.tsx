import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface Props {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
}

// Simulated icon map based on workflow name keywords
const getWorkflowIcon = (workflow: string) => {
  const name = workflow.toLowerCase();
  if (name.includes('form')) return <AssignmentIcon fontSize="small" />;
  if (name.includes('launch')) return <RocketLaunchIcon fontSize="small" />;
  if (name.includes('amend')) return <EditNoteIcon fontSize="small" />;
  if (name.includes('business')) return <BusinessCenterIcon fontSize="small" />;
  return <HelpOutlineIcon fontSize="small" />; // default
};

export default function WorkflowFilterDropdown({
  selected,
  setSelected,
  options,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleToggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSelectAll = () => setSelected(options);
  const handleClearAll = () => setSelected([]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Filter Workflows:
      </Typography>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
        size="small"
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          color: 'text.primary',
          borderColor: 'grey.400',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'grey.100',
          },
        }}
      >
        Workflows
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
        PaperProps={{
          sx: {
            bgcolor: '#f5f5f5',
            border: '1px solid #bdbdbd',
            borderRadius: 1,
            minWidth: 180,
            boxShadow: 3,
            textTransform: 'uppercase',
            fontSize: '11px',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" px={0.5} mb={1}>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectAll();
            }}
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            Select All
          </Button>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            Clear All
          </Button>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {options.map((workflow) => (
          <MenuItem
            key={workflow}
            onClick={() => handleToggle(workflow)}
            dense
            disableGutters
          >
            <Checkbox checked={selected.includes(workflow)} sx={{ pl: 1 }} />
            <ListItemIcon sx={{ minWidth: 28, pl: 1 }}>
              {getWorkflowIcon(workflow)}
            </ListItemIcon>
            <ListItemText primary={workflow} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
