import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import BreadCrumbs from './components/BreadCrumbs'; 
import DataTable from './components/DataTable';
import {
  Box,
  Container,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const handleEdit = (id: number) => {
  console.log(`Edit user with id: ${id}`);
};

const handleView = (id: number) => {
  console.log(`View user with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete users with ids: ${id}`);
};

const handleAdd = () => {
  console.log('Add new user');
};

const handleMultipleDelete = (ids: number[]) => {
  // Logic to delete multiple rows using the ids array
  console.log('Deleting rows with IDs:', ids);
};

const UserManagementPage: React.FC = () => {
  const theme = useTheme();
  interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }

  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'User Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const userServiceBaseUrl = process.env.REACT_APP_USER_MANAGEMENT_SERVICE_BASE_URL;
      const UserListEndpoint = 'api/users/';
      const RefreshTokenEndPoint = 'api/refreshtoken/';
      
      try {       
          const response = await axios.get(`${userServiceBaseUrl}${UserListEndpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '',
          },
        });     
        setUserData(response.data as User[]);

      } catch (error: any) {        
            
        if (error.response && error.response.status === 401) {
          console.log('Axios error:', error.message);          

          // Token expired, attempt refresh
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await axios.post<{ access_token: string; refresh_token: string }>(`${userServiceBaseUrl}${RefreshTokenEndPoint}`, { refreshToken }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          const { access_token, refresh_token }: { access_token: string; refresh_token: string } = response.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          
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
            </Box>
      </Container>
    </Box>
  );
};

export default UserManagementPage;