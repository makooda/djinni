import React from 'react';
import {
  Box,
  Divider,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardLayout from './layouts/DashboardLayout';
import MuiTable from './comp/MuiTable';
import PageHeader from './comp/PageHeader';
import SectionBox from './comp/SectionBox';

const columns = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Role', key: 'role' },
  { label: 'Status', key: 'status', sortable: false },
];

const rows = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  role: i % 2 === 0 ? 'Admin' : 'Viewer',
  status: i % 3 === 0 ? 'Active' : 'Pending',
}));

export default function MainDashboard() {
  return (
    <DashboardLayout>
      <Box height={{ xs: 'auto', sm: '100%' }}>
        <PageHeader title="All Activities" subtitle="Logs and process list" />

        <SectionBox height={200}>
          <Box display="flex" height="100%">
            {/* Left 25% */}
            <Box flex={1} display="flex" alignItems="center" justifyContent="flex-start">
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 300,
                }}
              >
                <SearchIcon sx={{ color: 'grey.600', mr: 0.5, ml: 0.5 }} />
                <InputBase
                  placeholder="Search..."
                  sx={{ flex: 1 }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Paper>
            </Box>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: 'grey.700', marginX: '10px' }}
            />

            {/* Middle 50% */}
            <Box flex={2} display="flex" alignItems="center" justifyContent="flex-start">
              <Typography>Center</Typography>
            </Box>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: 'grey.700', marginRight: '10px' }}
            />

            {/* Right 25% */}
            <Box flex={1} display="flex" alignItems="center" justifyContent="flex-start">
              <Typography variant="body1">Right</Typography>
            </Box>
          </Box>
        </SectionBox>

        <SectionBox bgcolor="grey.100" width={{ xs: '100%' }} height="100%">
          <MuiTable
            columns={columns}
            rows={rows}
            renderRowIcon={(row) => {
              const roleIcon = row.role === 'Admin' ? '🛡️' : '👀';
              const statusIcon = row.status === 'Active' ? '✅' : '⏳';
              return (
                <span style={{ fontSize: '1rem' }}>
                  {roleIcon} {statusIcon}
                </span>
              );
            }}
          />
        </SectionBox>
      </Box>
    </DashboardLayout>
  );
}
