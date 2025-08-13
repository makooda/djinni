import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface ContainerConfig {
  label?: string;
  subtitle?: string;
  direction?: 'row' | 'column'; // Flex direction
  gap?: number | string; // Gap between children
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'; // Align items
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'; // Justify content
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'; // Flex wrap
  padding?: number | string;
  margin?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  border?: string;
  borderRadius?: number | string;
  background?: string;
  boxShadow?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  showLabel?: boolean;
  showDivider?: boolean;
  // Add other config fields as needed
}

export interface ContainerControlProps {
  control: {
    config?: ContainerConfig;
  };
  children?: React.ReactNode;
}

export default function ContainerControl({
  control,
  children,
}: ContainerControlProps) {
  const {
    label,
    subtitle,
    direction = 'column',
    gap = 1,
    align = 'stretch',
    justify = 'flex-start',
    wrap = 'nowrap',
    padding = 1.5,
    margin = 0,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    border = '1px dashed #d8d8d8',
    borderRadius = 0.3,
    background = 'transparent',
    boxShadow,
    collapsible = false,
    defaultCollapsed = false,
    showLabel = false,
    showDivider = false,
  } = control.config || {};

  const [open, setOpen] = React.useState(!defaultCollapsed);

  React.useEffect(() => {
    if (!collapsible) setOpen(true);
    else setOpen(!defaultCollapsed);
    // eslint-disable-next-line
  }, [collapsible, defaultCollapsed]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: gap,
        p: padding,
        m: margin,
        minHeight: {minHeight},
        minWidth: {minWidth},
        maxHeight: {maxHeight},
        maxWidth: {maxWidth},
        border: {border},
        borderRadius: {borderRadius},
        background,
        boxShadow,
        transition: 'box-shadow 0.2s, border 0.2s, background 0.2s',
        position: 'relative',
        mb: 1,
      }}
    >
      {(showLabel || collapsible) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {showLabel && (
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {label}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
          {collapsible && (
            <IconButton
              size="small"
              onClick={() => setOpen((o) => !o)}
              sx={{ ml: 'auto' }}
              aria-label={open ? 'Collapse' : 'Expand'}
            >
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>
      )}
      {showDivider && <Box sx={{ borderBottom: '1px solid #eee', mb: 1 }} />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
