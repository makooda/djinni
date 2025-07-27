import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Tooltip,
  IconButton,
  Dialog,
  Button,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormsControlPalette from './FormsControlPanel';
import PreviewCanvas from './PreviewCanvas';
import DroppedControlRenderer from '../comp/canvas/DropppedControlRenderer';

type DroppedControl = {
  id: string;
  type: string;
  label?: string;
  config?: Record<string, any>;
};

type DragAndDropCanvasProps = {
  isPreview: boolean;
  setIsPreview: (value: boolean) => void;
  droppedControls: DroppedControl[];
  setDroppedControls: React.Dispatch<React.SetStateAction<DroppedControl[]>>;
  selectedControlId: string | null;
  setSelectedControlId: (id: string | null) => void;
};

export default function DragAndDropCanvas({
  droppedControls,
  setDroppedControls,
  selectedControlId,
  setSelectedControlId,
}: DragAndDropCanvasProps) {
  const [confirmClearOpen, setConfirmClearOpen] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);


  const handleConfirmClear = () => {
    setDroppedControls([]);
    localStorage.removeItem('djinni:droppedControls');
    setConfirmClearOpen(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const rawData = event.dataTransfer.getData('text/plain');
    if (!rawData) return;

    try {
      const data = JSON.parse(rawData);
      if (data?.type) {
        const newControl = {
          id: `${data.type}-${Date.now()}`,
          type: data.type,
          label: data.label,
          config: {},
        };
        const updated = [...droppedControls, newControl];
        localStorage.setItem('djinni:droppedControls', JSON.stringify(updated));
        setDroppedControls(updated);
      }
    } catch (err) {
      console.error('Failed to parse dropped data:', err);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        flexGrow: 1,
        p: 0.3,
        border: 'none',
        backgroundColor: 'white',
        minHeight: 500,
        borderRadius: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        paddingRight: 0.3,
      }}
    >
      {/* Forms Control Palette */}
      <FormsControlPalette />

      {/* Preview Toggle + Clear Canvas */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          py: 0.5,
        }}
      >
        {/* Left: Clear Canvas */}
        <Tooltip title="Clear Canvas" arrow>
          <IconButton
            onClick={() => setConfirmClearOpen(true)}
            size="small"
            sx={{
              p: 0.3,
              borderRadius: 0.5,
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 12, color: 'red' }} />
          </IconButton>
        </Tooltip>

        {/* Right: Preview Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={isPreview}
              size="small"
              onChange={(e) => setIsPreview(e.target.checked)}
            />
          }
          label="Preview Form"
          labelPlacement="start"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: 13,
              fontWeight: 400,
            },
          }}
        />
      </Box>

      {/* Canvas Area */}
      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        sx={{
          flexGrow: 1,
          border: '1px dashed #ccc',
          borderRadius: 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: 'grey.50',
          backgroundImage: `radial-gradient(circle, #aaa 0.6px, transparent 0.6px)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '20px 20px',
          height: '500',
          p: 1,
          gap: 1,
        }}
      >
        {isPreview ? (
          <PreviewCanvas />
        ) : droppedControls.length > 0 ? (
          droppedControls.map((control) => (
            <Box
              key={control.id}
              width="100%"
              onClick={() => setSelectedControlId(control.id)}
              sx={{
                border:
                  selectedControlId === control.id
                    ? '1px solid blue'
                    : '1px solid transparent',
                borderRadius: 0.5,
                p: 0.3,
              }}
            >
              <DroppedControlRenderer control={control} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Drag form controls here to build your form
          </Typography>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 0.5,
              p: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            flexDirection: 'column',
            gap: 1,
            p: 2,
           }}
         >
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: 12, fontWeight: 400 }}
          >
            Do you really want to Nuke all your work?
          </Typography>
           </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center'}}>
            <Button
              onClick={() => setConfirmClearOpen(false)}
              size="small"
              sx={{
                fontSize: 12,
                fontWeight: 400,
                textTransform: 'none',
                borderRadius: 0.5,
                height: 30,
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmClear}
              size="small"
              variant="contained"
              sx={{
                fontSize: 12,
                fontWeight: 400,
                textTransform: 'none',
                borderRadius: 0.5,
                height: 30,
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Yes, Nuke it!
            </Button>
        </Box>
      </Dialog>
    </Paper>
  );
}
