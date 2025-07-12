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
        borderRadius: 0.5,
        p: 0.5,
        mb: 1,
        width,
        maxheight: '40',
        mx: 'auto', // auto horizontal margin centers it
        verticalAlign: 'middle',
      }}
    >
      {children}
    </Box>
  );
}
