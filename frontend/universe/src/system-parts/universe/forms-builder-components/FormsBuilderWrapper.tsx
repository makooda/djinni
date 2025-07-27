import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DragAndDropCanvas from './DragAndDropCanvas';
import SettingsPanel from './SettingsPanel';

export type DroppedControl = {
  id: string;
  type: string;
  label?: string;
  config?: Record<string, any>;
};

export default function FormsBuilderWrapper() {
  const [droppedControls, setDroppedControls] = useState<DroppedControl[]>([]);
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('djinni:droppedControls');
    if (stored) {
      try {
        setDroppedControls(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse stored controls:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('djinni:droppedControls', JSON.stringify(droppedControls));
  }, [droppedControls]);

  return (
    <Grid container spacing={1} wrap="nowrap" sx={{ height: '100%', overflow: 'hidden' }}>
      <Grid  item xs={9} sx={{ height: '100%', overflow: 'hidden' }}>
        <DragAndDropCanvas
          droppedControls={droppedControls}
          setDroppedControls={setDroppedControls}
          selectedControlId={selectedControlId}
          setSelectedControlId={setSelectedControlId}
          isPreview={false}
          setIsPreview={() => {}}
        />
      </Grid>
      <Grid item xs={3} sx={{ height: '100%', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
        <SettingsPanel
          selectedControlId={selectedControlId}
          droppedControls={droppedControls}
          onUpdate={setDroppedControls}
        />
      </Grid>
    </Grid>
  );
}
