import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  People,
  Settings,
  Business,
  AccountTree,
  Code,
  Build,
  Forum,
  Description, // Description icon looks like a form/document
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type SubMenuItem = {
  label: string;
  path: string;
};

type MenuItemType = {
  label: string;
  icon: React.ReactElement;
  path?: string;
  subItems?: SubMenuItem[];
};

type MenuSection = {
  header: string;
  items: MenuItemType[];
};

type SideMenuProps = {
  open: boolean;
};

const menuStructure: MenuSection[] = [
  {
    header: 'System Administration',
    items: [
      { label: 'Users', icon: <People />, path: '/home/users' },
      { label: 'Settings', icon: <Settings />, path: '/home/settings' },
    ],
  },
  {
    header: 'Entities',
    items: [
      {
        label: 'Organizations',
        icon: <Business />,
        subItems: [
          { label: 'List', path: '/home/organizations/list' },
          { label: 'Create', path: '/home/organizations/create' },
        ],
      },
    ],
  },
  {
    header: 'DS Code',
    items: [
      {
        label: 'Forms Builder',
        icon: <Description />,
        path: '/universe/ds-code/forms-builder',
      },
    ],
  },
];

export default function SideMenu({ open }: SideMenuProps) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Box
      sx={{
        width: open ? 240 : 0,
        transition: 'width 0.3s ease',
        bgcolor: 'grey.100',
        borderRight: open ? '1px solid #ccc' : 'none',
        overflowX: 'hidden',
        p: open ? 1 : 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {open &&
        menuStructure.map(section => (
          <Box key={section.header} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                pl: 0,
                py: 0,
                color: 'grey.800',
                fontWeight: 600,
                fontSize: '0.80rem',
                textTransform: 'uppercase',
                backgroundColor: 'grey.200',
              }}
            >
              {section.header}
            </Typography>
            <List disablePadding>
              {section.items.map(item => (
                <React.Fragment key={item.label}>
                  <ListItemButton
                    sx={{
                      pl: 0,
                      pr: 0,
                      py: 0,
                      fontSize: '0.5rem',
                      gap: 1,
                    }}
                    onClick={() =>
                      item.subItems
                        ? toggleSubMenu(item.label)
                        : item.path && navigate(item.path)
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: 'grey.700',
                        mr: 0,
                        '& svg': {
                          fontSize: 15,
                        },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                      }}
                    />
                    {item.subItems &&
                      (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>

                  {item.subItems && (
                    <Collapse
                      in={openMenus[item.label]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map(sub => (
                          <ListItemButton
                            key={sub.label}
                            sx={{ pl: 5, pr: 1, py: 0.5, fontSize: '0.80rem' }}
                            onClick={() => navigate(sub.path)}
                          >
                            <ListItemText
                              primary={sub.label}
                              primaryTypographyProps={{ fontSize: '0.80rem' }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        ))}
    </Box>
  );
}
