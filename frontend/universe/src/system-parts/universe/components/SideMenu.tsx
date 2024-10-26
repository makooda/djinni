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
  onClick: (path: string) => void; // Add onClick prop
};

type MenuHeadingProps = {
  heading: string;
};

const MenuHeading: React.FC<MenuHeadingProps> = ({ heading }) => (
  <>
    <Typography variant="subtitle1" sx={{ padding: 2, fontWeight: 'bold', color: 'text.secondary' }}>
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
  path, // Add this to receive the path
  onClick // Add this to receive the onClick function
}) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleItemClick = () => {
    if (path) {
      navigate(path); // Navigate to the path if it exists
    } else {
      onSubMenuToggle(label); // Toggle submenu if there are subItems
    }
  };

  return (
    <>
      <ListItem onClick={handleItemClick} sx={{ paddingLeft: isOpen ? 2 : 0 }}>
        <ListItemIcon sx={{ minWidth: isOpen ? 40 : 24, marginRight: isOpen ? 1 : 0 }}>{icon}</ListItemIcon>
        {isOpen && <ListItemText primary={label} primaryTypographyProps={{ fontSize: '1rem', ml: 1 }} />}
        {subItems && <ListItemIcon>{openSubMenu === label ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>}
      </ListItem>
      {subItems && (
        <Collapse in={openSubMenu === label} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <MenuItemComponent
                key={subItem.label}
                label={subItem.label}
                icon={subItem.icon}
                isOpen={isOpen}
                openSubMenu={openSubMenu}
                onSubMenuToggle={onSubMenuToggle}
                onClick={onClick}
                path={subItem.path}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const SideMenu: React.FC<{ onMenuItemClick: (path: string) => void }> = ({ onMenuItemClick }) => {
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
        heading: 'System Administration',
        items: [{ label: 'User Management', icon: <UsersIcon />, path: '/admin/users' }],
      },
      {
        heading: 'Entity Administration',
        items: [
          {
            label: 'Organization',
            icon: <OrganizationIcon />,
            path: '#',
            subItems: [
              { label: 'Profile', icon: <ProfileIcon />, path: '/settings/profile', isOpen: true, openSubMenu: null, onSubMenuToggle: () => {}, onClick: () => {} },
              { label: 'Branding', icon: <BrandingIcon />, path: '/settings/branding', isOpen: true, openSubMenu: null, onSubMenuToggle: () => {}, onClick: () => {} },
              { label: 'Hierarchies', icon: <HierarchiesIcon />, path: '/settings/hierarchies', isOpen: true, openSubMenu: null, onSubMenuToggle: () => {}, onClick: () => {} },
              { label: 'Setups', icon: <SetupsIcon />, path: '/settings/setups', isOpen: true, openSubMenu: null, onSubMenuToggle: () => {}, onClick: () => {} },
            ],
          },
        ],
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
              />
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;