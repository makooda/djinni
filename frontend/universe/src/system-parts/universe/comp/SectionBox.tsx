import React from 'react';
import { Box, BoxProps } from '@mui/material';

type SectionBoxProps = {
  children: React.ReactNode;
  bgcolor?: string;
  width?: BoxProps['width'];
  height?: BoxProps['height'];
};

export default function SectionBox({
  children,
  bgcolor = 'grey.100',
  width = { xs: '100%', md: '100%' }, // default responsive width
}: SectionBoxProps) {
  return (
    <Box
      sx={{
        bgcolor,
        borderRadius: 2,
        p: 1.2,
        mb: 1,
        width,
        mx: 'auto', // auto horizontal margin centers it
      }}
    >
      {children}
    </Box>
  );
}
