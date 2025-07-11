// src/comp/BreadcrumbsBar.tsx

import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Crumb = {
  label: string;
  path?: string;
};

type BreadcrumbsBarProps = {
  items: Crumb[];
};

export default function BreadcrumbsBar({ items }: BreadcrumbsBarProps) {
  return (
    <Box
      sx={{
        px: 0,
        py: 0.5,
        borderColor: 'grey.200',
        color: 'primary.main',
        fontWeight: 500,
        fontSize: 14,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {items.map((crumb, index) => (
        <React.Fragment key={index}>
          {crumb.path && index !== items.length - 1 ? (
            <MuiLink
              component={RouterLink}
              to={crumb.path}
              underline="hover"
              sx={{
                fontWeight: 500,
                fontSize: 12,
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              {crumb.label}
            </MuiLink>
          ) : (
            <Typography sx={{ fontWeight: 500, fontSize: 12, color: 'text.primary' }}>
              {crumb.label}
            </Typography>
          )}
          {index < items.length - 1 && (
            <Typography sx={{ color: 'grey.500', mx: 1 }}>|</Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}
