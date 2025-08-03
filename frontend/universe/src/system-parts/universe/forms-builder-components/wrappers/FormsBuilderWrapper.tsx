import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DragAndDropCanvas from '../builder/DragAndDropCanvas';
import SettingsPanel from '../settings/SettingsPanel';
import { findControlById } from '../utils/controlUtils'; 

export type DroppedControl = {
  id: string;
  type: string;
  label?: string;
  config?: Record<string, any>;
  children?: DroppedControl[];
  position?: { x: number; y: number };
  layout?: 'column' | 'row' | 'grid'; 
  columns?: number; 
};

export default function FormsBuilderWrapper() {
  const [droppedControls, setDroppedControls] = useState<DroppedControl[]>([]);
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);
  const selectedControl = findControlById(droppedControls, selectedControlId);

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
          selectedControl={selectedControl}
          setDroppedControls={setDroppedControls}
          onUpdate={(newConfig) => {
            if (selectedControlId) {
              setDroppedControls((prevControls) =>
                prevControls.map((control) =>
                  control.id === selectedControlId
                    ? { ...control, config: { ...control.config, ...newConfig } }
                    : control
                )
              );
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
