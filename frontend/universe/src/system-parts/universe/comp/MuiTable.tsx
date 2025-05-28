import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Column = {
  label: string;
  key: string;
  sortable?: boolean;
};

type ReusableTableProps = {
  columns: Column[];
  rows: Record<string, any>[];
  rowsPerPage?: number;
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  renderRowIcon?: (row: Record<string, any>, index: number) => React.ReactNode;
};

const MuiTable: React.FC<ReusableTableProps> = ({
  columns,
  rows,
  rowsPerPage = 15,
  onSelectionChange,
  renderRowIcon,
}) => {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const currentPageIndexes = rows.slice(start, end).map((_, idx) => start + idx);
    setSelected((prev) =>
      checked ? Array.from(new Set([...prev, ...currentPageIndexes])) : prev.filter((i) => !currentPageIndexes.includes(i))
    );
  };

  const isAllSelected = () => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const currentPageIndexes = rows.slice(start, end).map((_, idx) => start + idx);
    return currentPageIndexes.every((i) => selected.includes(i));
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return rows;
    const { key, direction } = sortConfig;
    return [...rows].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === undefined || bValue === undefined) return 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [rows, sortConfig]);

  const getCellSx = (isLast = false) => ({
    paddingY: 0.25,
    paddingX: 1,
    fontSize: '0.875rem',
    borderBottom: '1px solid #e0e0e0',
    borderRight: isLast ? 'none' : '1px solid #e0e0e0',
    whiteSpace: 'nowrap',
  });

  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = selected.map((i) => rows[i]).filter(Boolean);
      onSelectionChange(selectedRows);
    }
  }, [selected, rows, onSelectionChange]);

  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#fafafa',
        border: '1px solid #e0e0e0',
      }}
    >
      <Table size="small">
        <TableHead sx={{ background: '#e0e0e0', height: '15px' }}>
            <TableRow sx={{ height: '40px' }}>
              {/* Checkbox Column */}
              <TableCell sx={{ width: 40, paddingX: 0.5 }}>
                <Checkbox
                  checked={isAllSelected()}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>

              {/* Icon Column */}
              <TableCell sx={{ width: 36, paddingX: 0.5 }}>
              </TableCell>

              {/* ID Column with Sorting */}
              <TableCell
                sx={{ width: 60, paddingX: 1 }}
                sortDirection={sortConfig?.key === 'id' ? sortConfig.direction : false}
              >
                <TableSortLabel
                  active={sortConfig?.key === 'id'}
                  direction={sortConfig?.direction === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>

              {/* Remaining Columns */}
              {columns
                .filter((col) => col.key !== 'id')
                .map((col) => (
                  <TableCell
                    key={col.key}
                    sx={getCellSx()}
                    sortDirection={sortConfig?.key === col.key ? sortConfig.direction : false}
                  >
                    {col.sortable !== false ? (
                      <TableSortLabel
                        active={sortConfig?.key === col.key}
                        direction={sortConfig?.direction === 'asc' ? 'asc' : 'desc'}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                ))}

              {/* Action Menu */}
              <TableCell sx={{ width: 40 }}></TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, idx) => {
              const globalIndex = page * rowsPerPage + idx;
              const isEven = idx % 2 === 0;
              return (
                <TableRow
                  key={globalIndex}
                  hover
                  sx={{
                    height: '40px',
                    backgroundColor: isEven ? '#fff' : '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#f1f1f1',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      ...getCellSx(),
                      width: 40,
                      paddingX: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    <Checkbox
                      checked={selected.includes(globalIndex)}
                      onChange={() => handleSelect(globalIndex)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      ...getCellSx(),
                      width: 36,
                      paddingX: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    {renderRowIcon?.(row, globalIndex)}
                  </TableCell>

                  <TableCell
                    sx={{
                      ...getCellSx(),
                      width: 50,
                      paddingX: 1,
                      textAlign: 'center',
                    }}
                  >
                    {row.id}
                  </TableCell>

                  {columns
                    .filter((col) => col.key !== 'id') // already displayed above
                    .map((col) => (
                      <TableCell key={col.key} sx={getCellSx()}>
                        {row[col.key] ?? ''}
                      </TableCell>
                    ))}

                  <TableCell sx={getCellSx(true)}>
                    <IconButton size="small">
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
  );
};

export default MuiTable;
