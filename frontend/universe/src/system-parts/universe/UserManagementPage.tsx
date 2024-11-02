import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useTheme } from '@mui/material/styles';
import BreadCrumbs from './components/BreadCrumbs'; 
import DataTable from './components/DataTable';
import UserForm from './components/UserForm';
import { User } from '../types/User';
import {
  Box,
  Container,
  CircularProgress
} from '@mui/material';

const handleEdit = (id: number) => {
  console.log(`Edit user with id: ${id}`);
};

const handleView = (id: number) => {
  console.log(`View user with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete users with ids: ${id}`);
};

const handleMultipleDelete = (ids: number[]) => {
  // Logic to delete multiple rows using the ids array
  console.log('Deleting rows with IDs:', ids);
};

const UserManagementPage: React.FC = () => {
  const theme = useTheme(); 

  //User Data State
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  //Form Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  //Data Grid Columns
  const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'User Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
  ];

  //handling Form Modal Actions
  const handleOpenForm = (mode: 'add' | 'edit' | 'view', user?: User) => {
    setSelectedUser(user);
    setModalMode(mode);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleUserSubmit = (user: User) => {
    if (modalMode === 'add') {
      // Add user logic
    } else if (modalMode === 'edit') {
      // Edit user logic
    }
  };

  const handleAdd = () => {
    handleOpenForm('add')
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userServiceBaseUrl = process.env.REACT_APP_USER_MANAGEMENT_SERVICE_BASE_URL;
      const UserListEndpoint = 'api/users/';
      const RefreshTokenEndPoint = 'api/refreshtoken/';
      //console.log(localStorage.getItem('access_token'))

      try {       
          const response = await axios.get(`${userServiceBaseUrl}${UserListEndpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });     
        setUserData(response.data as User[]);

      } catch (error: any) {        
            
        if (error.response && error.response.status === 401) {
             console.log('Axios error:', error.message);         
          try{
              // Token expired, attempt refresh
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post<{ access_token: string; refresh_token: string }>(`${userServiceBaseUrl}${RefreshTokenEndPoint}`, { 'refresh_token': refreshToken }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            const { access_token, refresh_token }: { access_token: string; refresh_token: string } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
          }catch(error: any){
            console.error('Error refreshing token:', error);
          }       
         
        // Retry the request with the new access token
          try {
            const response = await axios.get(`${userServiceBaseUrl}${UserListEndpoint}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '',
              },
            });

            setUserData(response.data as User[]);
          } catch (retryError) {
            console.error('Error refetching users after token refresh:', retryError);
          }          
        } else {
          console.error('Error fetching users:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
   
  return (
    <Box sx={{ 
        flexGrow: 1, 
        height:'100%', 
        padding: 0, 
        backgroundColor: theme.palette.grey[300]}}>
      <Container maxWidth={false} sx={{marginTop: '50px'}}>        
        {/* Breadcrumbs styled like the footer */}
        <BreadCrumbs/> 
        {/* User Table */}
        <Box 
          sx={{ 
            padding: 2, 
            textAlign: 'center'
          }}        >
            <DataTable
                rows={userData}
                columns={userColumns}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onMultipleDelete={handleMultipleDelete}
             />
             <UserForm
                open={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleUserSubmit}
                mode={modalMode}
                user={selectedUser}
              />
            </Box>
      </Container>
    </Box>    
  );
};

export default UserManagementPage;