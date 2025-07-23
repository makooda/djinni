import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { inherits } from 'util';

interface RightDockedModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function RightDockedModal({ open, title, onClose, children }: RightDockedModalProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(_event, reason) => {
        // Prevent closing when clicking the backdrop or pressing ESC
        if (reason === 'backdropClick' /*|| reason === 'escapeKeyDown'*/ ) return;
        onClose();
      }}
      slotProps={{
        paper: {
          sx: { width: '50%' }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0.3, backgroundColor: 'grey.300' }}>
        <Typography variant="subtitle2" fontWeight={500} fontSize={16}>{title}</Typography>
        <IconButton 
            size='small' 
            onClick={onClose} 
            sx={{
              fontSize: 12,
              fontWeight: 400,
              p:1,
              m:0.3,
              borderRadius:0.5,
              border: 'none',
              backgroundColor: 'grey.300',
              '&:hover fieldset': {
                backgroundColor: 'grey.300',
                color: '#1976d2'
              }
            }}
            ><CloseIcon /></IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
        {children}
      </Box>
    </Drawer>
  );
}
