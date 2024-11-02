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
  Typography ,
  FormControl, 
  FormLabel,
  Box,
  FormGroup
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
  const [formData, setFormData] = useState<User>({ id: 0, firstname: '', lastname: '', email: '', username:'', role:'' });

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setFormData(user || { id: 0, username:'', firstname: '', lastname: '', email: '', role: ''});
    } else {
      setFormData({ id: 0, firstname: '', lastname: '', email: '', username:'', role:'' });
    }
  }, [mode, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (mode !== 'view') {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <BootstrapDialog 
        open={open} 
        onClose={onClose} 
        fullWidth
        maxWidth='lg'
        aria-labelledby="form-dialog-title"
        >

      <DialogTitle sx={{ m: 0, p: 2 }} id="form-dialog-title" >
            <Typography gutterBottom>
                {mode === 'add' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'View User'}
            </Typography>
      </DialogTitle>

      <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
             <CloseIcon />
        </IconButton>

      <DialogContent dividers>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '95%' } }}
                noValidate
                autoComplete="off"
            > 
            
                <FormControl fullWidth>
                    <FormLabel htmlFor="firstname"> First Name</FormLabel>
                        <TextField                    
                            name="firstName"
                            id="firstname"
                            onChange={handleChange}
                            value={formData.firstname}
                            disabled={mode === 'view'}
                            type="text"
                            placeholder="John"
                            variant="outlined"
                        />
                </FormControl>
                <FormControl fullWidth>                    
                    <FormLabel htmlFor="lastname"> Last Name *</FormLabel>
                        <TextField   
                            required                 
                            name="lastname"
                            id="lastname"
                            onChange={handleChange}
                            value={formData.lastname}
                            disabled={mode === 'view'}
                            type="text"
                            placeholder="Doe"
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
