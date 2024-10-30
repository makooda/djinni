import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Visibility, Edit, Delete, Add, Remove } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

interface DataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
  onDelete?: (id: number) => void;
  onMultipleDelete?: (ids: number[]) => void;
  onAdd?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ rows, columns, onEdit, onView, onDelete, onMultipleDelete, onAdd }) => {
  const [selectionModel, setSelectionModel] = useState<number[]>([]);
  const paginationModel = { page: 0, pageSize: 5 };

  const enhancedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {onView && (
            <Tooltip title="View">
              <IconButton
                aria-label="view"
                color="primary"
                size="small"
                onClick={() => onView(params.row.id)}
                sx={{ color: '#2196f3',  mr: 1 }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          )}

          {onEdit && (
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                color="primary"
                size="small"
                onClick={() => onEdit(params.row.id)}
                sx={{ color: '#4caf50',  mr: 1 }}
              >
                <Edit />
              </IconButton>
              </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
                <IconButton
                    aria-label="delete"
                    color="error"
                    size="small"
                    onClick={() => onDelete(params.row.id)}
                    sx={{ color: '#f44336' }}
                  >
                    <Delete />
                </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

   return (
    <Paper sx={{ width: '100%', p: 2 }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Tooltip title="Add a new record">
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={onAdd}
            sx={{ backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' },  mr: 2 }}
          >
            <Add />
          </Fab>
        </Tooltip>
        <Tooltip title="Delete selected records">
          <Fab 
            aria-label="minus"
            color="error" 
            size="small" 
            onClick={() => onMultipleDelete && onMultipleDelete(selectionModel)}
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#c62828' } }}
          >
            <Remove  />
          </Fab>
        </Tooltip>
        
      </Stack>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DataGrid
          rows={rows}
          columns={enhancedColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel as number[]); // Update selection model
          }}
          rowSelectionModel={selectionModel} // Set selection model to DataGrid
          sx={{ border: 0 }}
        />
      </div>
    </Paper>
  );
};

export default DataTable;
