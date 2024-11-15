import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  FormControl,
  FormLabel,
  Box
} from '@mui/material';
import { User } from '../../types/User';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  mode: 'add' | 'edit' | 'view';
  user?: User;
}

const UserForm: React.FC<UserFormModalProps> = ({ open, onClose, onSubmit, mode, user }) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    profile: {
      phone_number: '',
      address: '',
      first_time_login: true,
      last_password_update: new Date()
    }
  });

  useEffect(() => {
    setFormData((prevFormData) => mode === 'edit' || mode === 'view' ? user || prevFormData : prevFormData);
  }, [mode, user]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const [field, nestedField] = name.split('.');

      if (nestedField) {
        return {
          ...prevData,
          [field]: {
            ...(prevData[field as keyof User] as Record<string, unknown>), 
            [nestedField]: value
          }
        };
      } else {
        return { ...prevData, [name]: value };
      }
      
    });
  };

  const handleFormSubmit = () => {
    if (mode !== 'view') {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <BootstrapDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography variant="h6">
          {mode === 'add' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'View User'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '95%' } }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="first_name">First Name *</FormLabel>
            <TextField
              name="first_name"
              id="first_name"
              onChange={handleChange}
              value={formData.first_name}
              disabled={mode === 'view'}
              placeholder="John"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="last_name">Last Name *</FormLabel>
            <TextField
              name="last_name"
              id="last_name"
              onChange={handleChange}
              value={formData.last_name}
              disabled={mode === 'view'}
              placeholder="Doe"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="username">Username *</FormLabel>
            <TextField
              name="username"
              id="username"
              onChange={handleChange}
              value={formData.username}
              disabled={mode === 'view'}
              placeholder="johndoe"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email *</FormLabel>
            <TextField
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              disabled={mode === 'view'}
              placeholder="johndoe@example.com"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="profile.phone_number">Phone Number</FormLabel>
            <TextField
              name="profile.phone_number"
              id="profile.phone_number"
              onChange={handleChange}
              value={formData.profile.phone_number}
              disabled={mode === 'view'}
              placeholder="123-456-7890"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="profile.address">Address</FormLabel>
            <TextField
              name="profile.address"
              id="profile.address"
              onChange={handleChange}
              value={formData.profile.address}
              disabled={mode === 'view'}
              placeholder="123 Main St"
              variant="outlined"
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {mode !== 'view' && (
          <Button onClick={handleFormSubmit} color="primary">
            {mode === 'add' ? 'Add' : 'Save'}
          </Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default UserForm;
