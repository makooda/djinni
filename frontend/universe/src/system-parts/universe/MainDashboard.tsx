import React from 'react';
import AppTheme from '../../shared-theme/AppTheme';
import {
  Box,
  Divider,
  InputBase,
  Paper,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardLayout from './layouts/DashboardLayout';
import Table from './comp/UniverseTable';
import PageHeader from './comp/PageHeader';
import SectionBox from './comp/SectionBox';
import TableColumnsSelector from './comp/UniverseTableColumnSelector';
import WorkflowFilterDropdown from './comp/UniverseWorkflowFilterDropdown';
import BulkActionDropdown from './comp/UniverseBulkActionDropdown';
import DateFilterBar from './comp/UniverseDateFilterBar';

//mockdata
import mockRows from './mockdata/mock_table_rows.json';

const columns = [
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Role', key: 'role', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
  { label: 'Workflow', key: 'workflowType', sortable: true },
];

const rows = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  role: i % 2 === 0 ? 'Admin' : 'Viewer',
  status: i % 3 === 0 ? 'Active' : 'Pending',
}));






export default function MainDashboard() {   
  // State to manage visible columns
  const [visibleColumns, setVisibleColumns] = React.useState(columns.map(col => col.key));
  const [workflowFilters, setWorkflowFilters] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Derive workflow options from rows
  const workflowOptions = Array.from(new Set(mockRows.map(r => r.workflowType)));

  // Filter rows based on workflow
  const filteredRows = workflowFilters.length === 0
    ? mockRows
    : mockRows.filter(row => workflowFilters.includes(row.workflowType));

  

  return (
    <AppTheme mode="light">
      <DashboardLayout>
        
        <Box height={{ xs: 'auto', sm: '100%' }}>
          <PageHeader title="All Activities" subtitle="Logs and process list" />
          <SectionBox >
            <Box display="flex" height="100%">
              {/* Left 25% */}
              <Box flex={1} display="flex" alignItems="center" justifyContent="flex-start">
                <Paper
                  component="form"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',                    
                    maxHeight: 30,
                  }}
                >
                  <SearchIcon sx={{ color: 'grey.600', mr: 0.5, ml: 0.5, fontSize: 'small' }} />
                  <InputBase
                    placeholder="Search..."
                    sx={{ flex: 1 , fontSize: 12, fontWeight:400, height: 30, p: 0.5 , borderRadius: 0.5 }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Paper>
              </Box>

              {/* Divider */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  bgcolor: 'grey.300',
                  mx: '10px',
                  mt: '0.2%',
                  height: 25,
                }}
              />

              {/* Middle 50% */}
              <Box flex={2} display="flex" alignItems="center" justifyContent="flex-start">
                {/* Column Selector and Workflow Filter Tray */}
                <TableColumnsSelector
                  columns={columns}
                  visibleColumns={visibleColumns}
                  onChange={setVisibleColumns}                  
                />
                <Box sx={{ width: 8 }} />

                {/* Workflow Filter Tray */}
                <WorkflowFilterDropdown
                  selected={workflowFilters}
                  setSelected={setWorkflowFilters}
                  options={workflowOptions}
                />

                <Box sx={{ width: 8 }} />
                {/* Bulk Action Dropdown */}
                {selectedRowIds.length > 0 && (
                  <BulkActionDropdown
                    onActionSelect={(category, action) => {
                      console.log(`Apply ${action} from ${category} to selected rows:`, selectedRowIds);
                      // Hook to your backend API here
                    }}
                  />
                )}
            
              </Box>
              {/* Divider */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  bgcolor: 'grey.300',
                  mx: '10px',
                  mt: '0.2%',
                  height: 25,
                }}
              />

              {/* Right 25% */}
              <Box flex={1} display="flex" alignItems="center" justifyContent="flex-start">
                <Box sx={{ width: 8 }} />
                <DateFilterBar
                  onDateFilterChange={(range) => {
                    console.log('Selected Date Range:', range);
                    // Filter the rows here or update global state
                  }}
                />

              </Box>
            </Box>
          </SectionBox>

          <SectionBox bgcolor="grey.100" width={{ xs: '100%' }} height="100%">
            <Table
              columns={columns.filter(col => visibleColumns.includes(col.key))}
              rows={filteredRows}
              visibleColumns={visibleColumns}
              selected={selectedRowIds}
              setSelected={setSelectedRowIds}
              renderRowIcon={(row) => {
                const roleIcon = row.role === 'Admin' ? '🛡️' : '👀';
                const statusIcon = row.status === 'Active' ? '✅' : '⏳';
                return (
                  <span style={{ fontSize: 'small' }}>
                    {statusIcon}
                  </span>
                );
              }}
            />
          </SectionBox>
        </Box>
      </DashboardLayout>
    </AppTheme>
  );
}
