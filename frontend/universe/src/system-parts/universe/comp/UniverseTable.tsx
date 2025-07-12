import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TableSortLabel,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'COLUMN';

function DraggableTableHeader({
  col,
  index,
  moveColumn,
  sortConfig,
  handleSort,
}: {
  col: { key: string; label: string };
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  handleSort: (key: string) => void;
}) {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <TableCell
      ref={(node) => {
        const element = node as HTMLTableCellElement | null;
        ref(drop(element));
      }}
      sx={{ 
        borderRight: '1px solid #ccc', 
        cursor: 'move',        
        fontSize: 'small',
        fontWeight: 400,
      }}
        sortDirection={sortConfig?.key === col.key ? sortConfig.direction : false}
      >
      <TableSortLabel
        active={sortConfig?.key === col.key}
        direction={sortConfig?.direction === 'asc' ? 'asc' : 'desc'}
        onClick={() => handleSort(col.key)}
      >
        <DragIndicatorIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
        {col.label}
      </TableSortLabel>
    </TableCell>
  );
}

type Column = { key: string; label: string };
type UniverseTableProps = {
  columns: Column[];
  rows: Record<string, any>[];
  visibleColumns?: string[];
  rowsPerPage?: number;
  renderRowIcon?: (row: Record<string, any>, index: number) => React.ReactNode;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

const UniverseTable: React.FC<UniverseTableProps> = ({ columns: initialColumns, rows, visibleColumns, rowsPerPage = 15, renderRowIcon, selected, setSelected }) => {
  const [page, setPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(initialColumns);


  //State to manage selected rows
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveRowIndex(index);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveRowIndex(null);
  };

  const handleRowAction = (category: string, action: string) => {
    const rowData = rows[activeRowIndex ?? 0];
    console.log(`Row #${activeRowIndex}: ${category} → ${action}`, rowData);
    //TODO: Hook this into your actual API logic
    handleMenuClose();
  };
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    return sortConfig.direction === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const getCellSx = (isLast = false) => ({    
    fontSize: 'small',
    fontWeight: 300,
    borderBottom: '1px solid #e0e0e0',
    borderRight: isLast ? 'none' : '1px solid #e0e0e0',
  });

  const handleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isAllSelected = () => selected.length === rows.length;

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? rows.map((_, i) => i) : []);
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newCols = [...columns];
    const [moved] = newCols.splice(fromIndex, 1);
    newCols.splice(toIndex, 0, moved);
    setColumns(newCols);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 0.5,
          overflow: 'auto',
          backgroundColor: '#fafafa',
          border: '1px solid #e0e0e0',
        }}
      >
        <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: {
                bgcolor: '#f5f5f5',
                border: '1px solid #bdbdbd',
                borderRadius: 1,
                minWidth: 180,
                boxShadow: 3,
              },
            }}
        >
          {/* Group 1: Status */}
          <MenuItem
              disabled
              sx={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase' }}
            >
              Execute
            </MenuItem>
            {['Now', 'Schedule'].map((action) => (
              <MenuItem
                key={action}
                onClick={() => handleRowAction('Execute', action)}
                sx={{ textTransform: 'uppercase', fontSize: 12 }}
              >
                {action}
              </MenuItem>
            ))}
          
          <Divider />

          {/* Group 2: Execute */}
          <MenuItem
              disabled
              sx={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase' }}
            >
              Change Status
            </MenuItem>
            {['Transfer', 'Delete', 'Trash'].map((action) => (
              <MenuItem
                key={action}
                onClick={() => handleRowAction('Change Status', action)}
                sx={{ textTransform: 'uppercase', fontSize: 12 }}
              >
                {action}
              </MenuItem>
          ))}
          
          <Divider />

          {/* Group 3: View */}
          <MenuItem
              disabled
              sx={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase' }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => handleRowAction('View', 'Inspect')}
              sx={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Inspect
          </MenuItem>
        </Menu>

        <Table size="small">
          <TableHead
            sx={{                           
              backgroundColor: '#2c2c2c',
              '& .MuiTableCell-root': {
                color: '#ffffff',
                fontWeight: 400,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#3a3a3a',
                },
              },
              '& .MuiTableSortLabel-root': {
                color: '#cccccc',
                '&:hover': {
                  color: '#ffffff',
                },
              },
              '& .MuiTableSortLabel-root.Mui-active': {
                color: '#ffffff',
              },
              '& .MuiTableSortLabel-icon': {
                color: '#ffffff !important',
              },
            }}
          >
            <TableRow sx={{
              padding: 0,
              height: 40,
             }}>
              <TableCell 
                sx={{ 
                ...getCellSx(), 
                padding: 0,
                textAlign: 'center',
                }}>

                <Checkbox
                  sx={{   
                    padding: 0.5,                                                    
                    fontSize: 'small',
                  }}
                    checked={isAllSelected()}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>
              <TableCell sx={getCellSx()}> - </TableCell>
              {columns
                .filter(col => !visibleColumns || visibleColumns.includes(col.key))
                .map((col, index) => (
                  <DraggableTableHeader                  
                    key={col.key}
                    col={col}
                    index={index}
                    moveColumn={moveColumn}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
              ))}
              <TableCell sx={getCellSx(true)}>-</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                const globalIndex = page * rowsPerPage + idx;
                return (
                  <TableRow
                      key={globalIndex}
                      hover
                      onClick={(e) => {
                        const tagName = (e.target as HTMLElement).tagName.toLowerCase();
                        if (tagName !== 'input' && tagName !== 'button' && tagName !== 'svg' && tagName !== 'path') {
                          handleRowAction('Execute', 'Now');
                        }
                      }}
                      sx={{                        
                        backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
                        cursor: 'pointer',
                      }}
                    >

                    <TableCell sx={{ ...getCellSx(), width: '20px', p:'0px', textAlign: 'center' }}>
                      <Checkbox
                      sx={{
                        padding: 0.5,
                        fontSize: 'small',                        
                      }}
                        checked={selected.includes(globalIndex)}
                        onChange={() => handleSelect(globalIndex)}
                      />
                    </TableCell>
                    <TableCell sx={{ ...getCellSx(), width: '20px', p:'0px', textAlign: 'center' }}>
                      {renderRowIcon?.(row, globalIndex)}
                    </TableCell>
                    {columns
                      .filter((col) => !visibleColumns || visibleColumns.includes(col.key))
                      .map((col) => (
                        <TableCell key={col.key} sx={{ ...getCellSx(), width: '25px', pl:'5px' }}>
                          {row[col.key] ?? ''}
                        </TableCell>
                    ))}
                    <TableCell sx={{ ...getCellSx(true), width: '10px', textAlign: 'center', p:'3px' }}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, globalIndex)}
                        sx={{
                          p: 0, 
                          border: 'none', 
                          minWidth: 0, 
                          backgroundColor: 'transparent', 
                          '&:hover': {
                            backgroundColor: 'transparent', 
                          },
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};

export default UniverseTable;
