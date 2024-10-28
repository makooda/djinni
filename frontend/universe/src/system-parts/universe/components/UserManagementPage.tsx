import React from 'react';
import {
  Box,
  Container,
  Typography,
  Toolbar,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const UserManagementPage: React.FC = () => {
  // Sample data - replace with actual user data
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', role: 'Manager' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 0 }}>
      <Toolbar />
      <Toolbar />
      <Container maxWidth={false} sx={{ padding: 0, width: '100%' }}>
        
        {/* Breadcrumbs styled like the footer */}
        <Box
          sx={{
            bgcolor: 'grey.800', // Change to desired background color
            color: 'white', // Set text color to white for contrast
            padding: 2,
            borderRadius: 1,
            mb: 2, // Margin bottom to separate from content below
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit' }}>
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="inherit">User Management</Typography>
          </Breadcrumbs>
        </Box>
        <Typography variant="h4" gutterBottom>
          Users Page
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Here you can view, edit, and manage users within the system.
        </Typography>

        {/* User Table */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default UserManagementPage;
