import React from 'react';
import { Box, Chip } from '@mui/material';

const workflowTypes = [
  { label: 'Forms', key: 'forms-wf' },
  { label: 'Launches', key: 'process-launches-wf' },
  { label: 'Amendments', key: 'amendment-wf' },
  { label: 'New Business', key: 'new-business-wf' },
];

interface WorkflowFilterTrayProps {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const WorkflowFilterTray: React.FC<WorkflowFilterTrayProps> = ({ selectedFilters, setSelectedFilters }) => {
  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 2 }}>
      <Box sx={{ fontWeight: 'bold', mr: 1 }}></Box>
      {workflowTypes.map(({ key, label }) => (
        <Chip
          key={key}
          label={label}
          clickable
          variant={selectedFilters.includes(key) ? 'filled' : 'outlined'}
          color={selectedFilters.includes(key) ? 'primary' : 'default'}
          onClick={() => toggleFilter(key)}
        />
      ))}
    </Box>
  );
};

export default WorkflowFilterTray;
