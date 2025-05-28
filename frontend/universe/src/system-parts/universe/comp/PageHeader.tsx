import React from 'react';
import { Typography, Box } from '@mui/material';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
};

export default function PageHeader({
  title,
  subtitle,
  align = 'left',
}: PageHeaderProps) {
  return (
    <Box mb={0.5}>
      <Typography
        align={align}
        gutterBottom
        sx={{ fontWeight: 500, fontSize: '1.2rem', marginBottom:0 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" align={align} color="text.secondary" sx={{fontWeight:400, fontSize:'0.8rem'}}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
