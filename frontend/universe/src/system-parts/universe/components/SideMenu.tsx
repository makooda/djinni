import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  Divider,
  Typography,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Group as UsersIcon,
  AccountBalance as OrganizationIcon,
  AccountCircle as ProfileIcon,
  BrandingWatermark as BrandingIcon,
  Layers as HierarchiesIcon,
  Build as SetupsIcon,
} from '@mui/icons-material';

type MenuItemProps = {
  label: string;
  icon: JSX.Element;
  path?: string;
  subItems?: MenuItemProps[];
  isOpen: boolean;
  openSubMenu: string | null;
  onSubMenuToggle: (label: string) => void;
  onClick: (path: string) => void; 
  selectedPath: string;
};

type MenuHeadingProps = {
  heading: string;
};

const MenuHeading: React.FC<MenuHeadingProps> = ({ heading }) => (
  <>
    <Typography variant="subtitle1" sx={{ padding: 1, fontWeight: 'bold', color: 'text.secondary' }}>
      {heading}
    </Typography>
    <Divider />
  </>
);

const MenuItemComponent: React.FC<MenuItemProps> = ({
  label,
  icon,
  subItems,
  isOpen,
  openSubMenu,
  onSubMenuToggle,
  path, 
  onClick , 
  selectedPath,
}) => {
  const handleItemClick = () => {
    if (subItems) {
      onSubMenuToggle(label); // Toggle submenu if there are subItems
    } else if (path) {
      onClick(path); // Navigate to the path if it exists
    }
  };
  const isSelected = selectedPath === path;

  return (
    <>
      <ListItem
        onClick={handleItemClick}
        sx={{
          paddingLeft: isOpen ? 1 : 0,
          cursor: 'pointer',
          backgroundColor: isSelected ? 'grey.300' : 'transparent',
          '&:hover': {
            backgroundColor: 'grey.300', 
          },          
        }}
      >
        <ListItemIcon sx={{ minWidth: isOpen ? 4 : 24, marginRight: isOpen ? 1 : 0 }}>{icon}</ListItemIcon>
        {isOpen && <ListItemText primary={label} primaryTypographyProps={{ fontSize: '1rem', ml: 1 }} />}
        {subItems && <ListItemIcon>{openSubMenu === label ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>}
      </ListItem>
      {subItems && (
        <Collapse in={openSubMenu === label} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ backgroundColor: 'grey.200' }}>
            {subItems.map((subItem) => (
              <MenuItemComponent
                key={subItem.label}
                label={subItem.label}
                icon={subItem.icon}
                path={subItem.path}
                subItems={subItem.subItems}
                isOpen={isOpen}
                openSubMenu={openSubMenu}
                onSubMenuToggle={onSubMenuToggle}
                onClick={onClick}
                selectedPath={selectedPath}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const SideMenu: React.FC<{ onMenuItemClick: (path: string) => void; selectedPath: string }> = ({ 
  onMenuItemClick,
  selectedPath,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const menuItems = [
    {
      heading: 'Manage Entities',
      items: [
        {
          label: 'Organization',
          icon: <OrganizationIcon />,
          path: '#',
          subItems: [
            { label: 'Profile', icon: <ProfileIcon />, path: '/organization/profile', isOpen, openSubMenu, onSubMenuToggle: handleSubMenuToggle, onClick: onMenuItemClick, selectedPath: '' },
            { label: 'Branding', icon: <BrandingIcon />, path: '/organization/branding', isOpen, openSubMenu, onSubMenuToggle: handleSubMenuToggle, onClick: onMenuItemClick, selectedPath: '' },
            { label: 'Hierarchies', icon: <HierarchiesIcon />, path: '/organization/hierarchies', isOpen, openSubMenu, onSubMenuToggle: handleSubMenuToggle, onClick: onMenuItemClick, selectedPath: '' },
            { label: 'Setups', icon: <SetupsIcon />, path: '/organization/setups', isOpen, openSubMenu, onSubMenuToggle: handleSubMenuToggle, onClick: onMenuItemClick, selectedPath: '' },
          ],
        },
      ],
    },
    {
      heading: 'System Administration',
      items: [{ label: 'User Management', icon: <UsersIcon />, path: '/admin/users' }],
    },
  ];
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 60,
          transition: 'width 0.3s',
        },
      }}
    >
      <IconButton onClick={toggleMenu} sx={{ margin: 1 }}>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Divider />
      <List>
        {menuItems.map(({ heading, items }) => (
          <React.Fragment key={heading}>
            <MenuHeading heading={heading} />
            {items.map((item) => (
              <MenuItemComponent
                key={item.label}
                {...item}
                isOpen={isOpen}
                openSubMenu={openSubMenu}
                onSubMenuToggle={handleSubMenuToggle}
                onClick={onMenuItemClick}
                selectedPath={selectedPath}
              />
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
