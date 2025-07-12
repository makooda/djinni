import React, { useState } from 'react';
import {
  TreeView,
  TreeItem,
} from '@mui/lab';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ExpandMore,
  ChevronRight,
  MoreVert,
} from '@mui/icons-material';

const initialData = [
  {
    id: 'group-1',
    label: 'Claims',
    children: [
      { id: 'form-1', label: 'Claim Form A' },
      { id: 'form-2', label: 'Claim Form B' },
    ],
  },
  {
    id: 'group-2',
    label: 'Onboarding',
    children: [
      { id: 'form-3', label: 'Onboarding Form A' },
    ],
  },
];

export default function FormsTreeViewManager() {
  const [data, setData] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContextMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action} on ID: ${selectedId}`);
    // Hook into API or state updates here
    handleClose();
  };

  return (
    <Box sx={{ px: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Workgroups & Forms
      </Typography>

      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        sx={{ maxHeight: '100%', overflowY: 'auto' }}
      >
        {data.map((group) => (
          <TreeItem
            key={group.id}
            nodeId={group.id}
            label={
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Typography fontWeight={600} fontSize={13}>
                  {group.label}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => handleContextMenuOpen(e, group.id)}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            {group.children.map((form) => (
              <TreeItem
                key={form.id}
                nodeId={form.id}
                label={
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography fontSize={13}>{form.label}</Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleContextMenuOpen(e, form.id)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            ))}
          </TreeItem>
        ))}
      </TreeView>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: 160, border: '1px solid #ccc' } }}
      >
        {['Create', 'Rename', 'Duplicate', 'Activate', 'Deactivate', 'Delete'].map((action) => (
          <MenuItem
            key={action}
            onClick={() => handleAction(action)}
            sx={{ textTransform: 'uppercase', fontSize: 12 }}
          >
            {action}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
