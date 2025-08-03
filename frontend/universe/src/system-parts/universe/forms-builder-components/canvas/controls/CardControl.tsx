import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ControlConfig {
  title?: string;
  subtitle?: string;
  showBorder?: boolean;
  showShadow?: boolean;
  background?: string;
  collapsible?: boolean;
}

interface CardControlProps {
  control: {
    config?: ControlConfig;
  };
  children?: React.ReactNode;
}

export default function CardControl({ control, children, isRoot }: { control: { config?: ControlConfig }; children: React.ReactNode; isRoot?: boolean }) {
  const {
    title,
    subtitle,
    showBorder = true,
    showShadow = true,
    background = "#fff",
    collapsible = false,
  } = control.config || {};

  const [open, setOpen] = React.useState(true);

  // Sync collapse open state if collapsible prop changes (optional, but robust)
  React.useEffect(() => {
    if (!collapsible) setOpen(true);
  }, [collapsible]);

  return (
    <Paper
      elevation={showShadow ? 2 : 0}
        sx={{
            p: 1.5,
            border: showBorder ? '1px solid #b8c0c9' : 'none',
            background: background,
            borderRadius: 0.3,
            mb: 1,
            minwidth: isRoot ? '98%' : '100%', // or 'auto' for children
            minheight: isRoot ? '100%' : '100%',
            position: 'relative',
            transition: 'box-shadow 0.2s, border 0.2s',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
      {children}
    </Paper>
  );
}
