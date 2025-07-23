// src/comp/BulkActionDropdown.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
  onActionSelect: (category: string, action: string) => void;
  disabled?: boolean;
}

const bulkActions = {
  Execute: ['Now', 'Schedule'],
  'Change Status': ['Transfer', 'Delete', 'Trash',],
  View: ['Inspect']
};

export default function UniverseBulkActionDropdown({ onActionSelect, disabled }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleClick = (category: string, action: string) => {
    handleClose();
    onActionSelect(category, action);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 400, fontSize: 12 }}>
        Actions
      </Typography>
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowDropDownIcon />}
        disabled={disabled}
        onClick={handleOpen}
        sx={{
          textTransform: 'none',
          fontSize: 12,
          fontWeight: 400,
          maxHeight: 30,
          color: 'text.primary',
          borderRadius: 0.5,
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
          },
        }}
      >
        {Object.entries(bulkActions).map(
          ([category, actions]: [string, string[]], index: number) => (
            <Box key={category}>
              {index > 0 && <Divider />}
              <Typography sx={{ px: 2, pt: 1, fontSize: 11, fontWeight: 400, color: 'text.secondary' }}>
                {category}
              </Typography>
              {actions.map((action: string) => (
                <MenuItem
                  key={action}
                  onClick={() => handleClick(category, action)}
                  sx={{ pl: 3 , textTransform: 'uppercase', fontSize:11}}
                >
                  {action}
                </MenuItem>
              ))}
            </Box>
          )
        )}
      </Menu>
    </Box>
  );
}
