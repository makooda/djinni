// src/comp/BreadcrumbsBar.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';

type BreadcrumbsBarProps = {
  items: string[];
};

export default function BreadcrumbsBar({ items }: BreadcrumbsBarProps) {
  return (
    <Box
      sx={{
        px: 3,
        py: 0,
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
          <Typography color="primary" sx={{ fontWeight: 500, fontSize:12 }}>{crumb}</Typography>
          {index < items.length - 1 && (
            <Typography sx={{ color: 'grey.500', mx: 1 }}>|</Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}
