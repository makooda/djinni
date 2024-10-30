import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Button } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import BreadCrumbs from './components/BreadCrumbs'; 
import DataTable from './components/DataTable';

const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 }
];

const userData = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', role: 'Manager' },
];
 
const handleEdit = (id: number) => {
  console.log(`Edit user with id: ${id}`);
};

const handleView = (id: number) => {
  console.log(`View user with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete user with id: ${id}`);
};

const UserManagementPage: React.FC = () => (
  <DataTable
    rows={userData}
    columns={userColumns}
    onEdit={handleEdit}
    onView={handleView}
    onDelete={handleDelete}
  />
);

export default UserManagementPage;
