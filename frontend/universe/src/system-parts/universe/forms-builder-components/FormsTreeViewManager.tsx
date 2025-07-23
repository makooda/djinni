import React, { useState } from 'react';
import {
  TreeItem,
  SimpleTreeView,
} from '@mui/x-tree-view';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/ArticleOutlined';
import MoreHorizontalEllipsis from '@mui/icons-material/MoreHorizOutlined';
import RightDockedModal from '../comp/RightDockModal';
import AddGenericFormComponent from '../forms-builder-tabs/forms/AddGenericFormComponent';

type FormNode = {
  id: string;
  label: string;
  type?: 'form' | 'group';
  children?: FormNode[];
};

interface FormsTreeViewManagerProps {
  initialData?: FormNode[];
}

export default function FormsTreeViewManager({ initialData = [] }: FormsTreeViewManagerProps) {
  const [data, setData] = useState<FormNode[]>(initialData);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'addGenericFormComponent' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
    handleClose();
  };

  const handleAddGroup = () => {
    const newGroupId = `group-${data.length + 1}`;
    setData([
      ...data,
      {
        id: newGroupId,
        label: `New Group ${data.length + 1}`,
        type: 'group',
        children: [],
      },
    ]);
    console.log(data)
  };
  const openDrawer = (mode: 'addGenericFormComponent', item: any) => {
    setDrawerMode('addGenericFormComponent');
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerMode(null);
    setSelectedItem(null);
  };

  const renderNode = (node: FormNode) => {
    const isExpanded = expanded.includes(node.id);
    const isGroup = node.type !== 'form';
    const isForm = node.type === 'form';
   

    return (
      <TreeItem        
        sx={{
          '& .MuiTreeItem-content': {
            transition: 'background-color 0.2s ease',
          },
          '&:hover, &:focus': {
            '& .MuiTreeItem-content': { borderRadius: 0.5 },
            '& .MuiTreeItem-label': { borderRadius: 0.5 },
          },
          ...(selectedId === node.id && {
            '& .MuiTreeItem-content': {
              borderRadius: 0.5,
            },
          }),
        }}
        key={node.id}
        itemId={node.id}
        label={
         <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pr: 0,
              height: 20,
              p: 0.3,
            }}
          >
           <Box
              onMouseEnter={() => setSelectedId(node.id)} 
              onMouseLeave={() => setSelectedId(null)}
              onClick={() => isGroup && toggleExpand(node.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: isGroup ? 'pointer' : 'default',
                height: 30,
              }}
            >
              {isGroup ? (
                isExpanded ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />
              ) : (
                <ArticleIcon fontSize="small" />
              )}
              <Typography
                fontSize={12}
                fontWeight={isGroup ? 600 : 400}
                sx={{ userSelect: 'none' }}
              >
                {node.label}
              </Typography>
            </Box>
           {!isGroup &&(
              <IconButton size="small" onClick={(e) => handleContextMenuOpen(e, node.id)} sx={{ border: 'none', backgroundColor: 'transparent' , '&:hover': { backgroundColor: 'transparent' } }}>
                {selectedId === node.id && isForm && (
                <MoreHorizontalEllipsis fontSize='small' sx={{ fontWeight: 400}}/>
                )}
              </IconButton>
            )}
          </Box>
        }
      >
        {node.children?.map((child) => renderNode(child))}
      </TreeItem>
    );
  };

  return (
    <Box sx={{}}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontSize: 12, fontWeight: 400 }}>
        🗂️ Generic Forms Hierarchy
      </Typography>

      <Box sx={{ mb:1, width: '100px', display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title="Add new compoenent to hierarchy">
        <Button
          size="small"
          onClick={() => openDrawer('addGenericFormComponent', { label: 'Default TextField Value' })} //when implementing correctly label is the default valus the textfield assumes when called
          aria-label="Group"
          variant="outlined"
          sx={{
            border: '1px solid #ccc',
            height: 25,
            minWidth: 110,
            borderRadius: '0.5', // Pill shape
            gap: 0.5,
            px: 1.5,
            mr: 1,
            fontSize: 12,
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'grey.100',
              borderColor: 'success.main',
              color: 'success.main',
            },
          }}
        >
          + Component
        </Button>
        
        </Tooltip>
        <RightDockedModal open={drawerOpen} title="Add Generic Form Hierarchy Component" onClose={closeDrawer}>
            {drawerMode === 'addGenericFormComponent' && (
                <AddGenericFormComponent item={selectedItem} onSubmit={closeDrawer} />
           )}
        </RightDockedModal>

        <Tooltip title="Remove component from hierarchy">              
          <Button
            size="small"
            onClick={handleAddGroup}
            aria-label="Group"
            variant="outlined"
            sx={{
              border: '1px solid #ccc',
              height: 25,
              minWidth: 110,
              borderRadius: '0.5', // Pill shape
              gap: 0.5,
              px: 1.5,
              mr: 1,
              fontSize: 12,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'grey.100',
                borderColor: 'error.main',
                color: 'error.main',
              },
            }}
          >
            - Component
          </Button>
        </Tooltip>
      </Box>

      <SimpleTreeView
        expandedItems={expanded}
        onExpandedItemsChange={(event, ids: string[]) => setExpanded(ids)}
      >
        {data.map((group) => renderNode(group))}
      </SimpleTreeView>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: { sx: { minWidth: 160, border: '1px solid #ccc' } },
        }}
      >
        {['Rename', 'Duplicate', 'Activate', 'Deactivate', 'Delete'].map((action) => (
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
