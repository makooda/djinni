import React, { useState, useEffect } from 'react';
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
import ContentCopyIcon from '@mui/icons-material/ContentCopyOutlined';
import FormsControlPalette from '../palette/FormsControlPanel';
import PreviewCanvas from './PreviewCanvas';
import CardControl from '../canvas/controls/CardControl';
import DroppedControlRenderer from '../canvas/DropppedControlRenderer';
import { DroppedControl } from '../wrappers/FormsBuilderWrapper';

type DragAndDropCanvasProps = {
  droppedControls: DroppedControl[];
  setDroppedControls: React.Dispatch<React.SetStateAction<DroppedControl[]>>;
  selectedControlId: string | null;
  setSelectedControlId: (id: string | null) => void;
  isPreview?: boolean;
  setIsPreview?: (preview: boolean) => void;
};

const CONTAINER_TYPES = [
  'card', 'container', 'repeater', 'table', 'tab', 'wizard', 'wizard_step'
];
const GRID_SIZE = 5;
const snap = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

function addControl(
  controls: DroppedControl[],
  parentId: string | null,
  newControl: DroppedControl
): DroppedControl[] {
  if (!parentId) {
    return [...controls, newControl];
  }
  return controls.map((ctrl) => {
    if (ctrl.id === parentId) {
      return { ...ctrl, children: [...(ctrl.children || []), newControl] };
    }
    if (ctrl.children) {
      return { ...ctrl, children: addControl(ctrl.children, parentId, newControl) };
    }
    return ctrl;
  });
}

export default function DragAndDropCanvas({
  droppedControls,
  setDroppedControls,
  selectedControlId,
  setSelectedControlId,
}: DragAndDropCanvasProps) {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapLines, setSnapLines] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });
  //const [hoveredContainerId, setHoveredContainerId] = useState<string | null>(null); //Enable for dubing if nested containers are being hovered
  const CONTROL_RENDERERS: Record<string, React.ComponentType<any>> = {

  card: CardControl,
  // container: ContainerControl,
  // repeater: RepeaterControl,
  // etc...
};

  // --- Reorder logic for container children (not draggable attribute, just mouse) ---
  const [childDrag, setChildDrag] = useState<{
    parentId: string;
    fromIndex: number;
    y: number;
  } | null>(null);

  // Only sort controls at the top-level
  const sortedControls = [...droppedControls].sort((a, b) => {
    const ay = a.position?.y ?? 0;
    const by = b.position?.y ?? 0;
    if (ay !== by) return ay - by;
    const ax = a.position?.x ?? 0;
    const bx = b.position?.x ?? 0;
    return ax - bx;
  });

  // Free positioning on canvas
  const handleStartDrag = (e: React.MouseEvent, id: string) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    setDraggingId(id);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingId) return;
    const canvasRect = dropZoneRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    const rawX = e.clientX - canvasRect.left - offset.x;
    const rawY = e.clientY - canvasRect.top - offset.y;
    const x = snap(rawX);
    const y = snap(rawY);

    setSnapLines({ x, y });
    setDroppedControls((prev) =>
      prev.map((ctrl) =>
        ctrl.id === draggingId
          ? { ...ctrl, position: { x, y } }
          : ctrl
      )
    );
  };

  const handleStopDrag = () => {
    setDraggingId(null);
    setSnapLines({ x: null, y: null });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleStopDrag);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleStopDrag);
    };
    // eslint-disable-next-line
  }, [draggingId, offset]);

  // --- Child reorder logic (mouse) ---
  useEffect(() => {
    if (!childDrag) return;
    const handleMouseUp = (e: MouseEvent) => {
      // Find new index based on mouse Y position
      const containerBox = document.querySelector(`[data-container-id="${childDrag.parentId}"]`);
      if (!containerBox) return setChildDrag(null);
      const boxes = Array.from(containerBox.querySelectorAll('[data-draggable-child="true"]'));
      let toIndex = childDrag.fromIndex;
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i] as HTMLElement;
        const rect = box.getBoundingClientRect();
        if (e.clientY > rect.top + rect.height / 2) {
          toIndex = i;
        }
      }
      if (toIndex !== childDrag.fromIndex) {
        handleReorderChildControl(childDrag.parentId, childDrag.fromIndex, toIndex);
      }
      setChildDrag(null);
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [childDrag]);

  const handleConfirmClear = () => {
    setDroppedControls([]);
    localStorage.removeItem('djinni:droppedControls');
    setConfirmClearOpen(false);
  };

  // Accept drop from palette on root canvas or container
  const handleDrop = (
    event: React.DragEvent,
    parentId: string | null = null
  ) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Dropping on parentId:", parentId);

    const rawData = event.dataTransfer.getData('text/plain');
    if (!rawData) return;

    try {
      const data = JSON.parse(rawData);
      if (!data.type) return;

      const newControl: DroppedControl = {
        id: `${data.type}-${Date.now()}`,
        type: data.type,
        label: data.label,
        config: {},
        children: [],
        ...(parentId ? {} : { position: { x: 50, y: 50 } }),
      };

      const updated = addControl(droppedControls, parentId, newControl);
      localStorage.setItem('djinni:droppedControls', JSON.stringify(updated));
      setDroppedControls(updated);
    } catch (err) {
      console.error('Failed to parse dropped data:', err);
    }
  };

  const deleteControlById = (controls: DroppedControl[], id: string): DroppedControl[] => {
    return controls
      .filter((control) => control.id !== id)
      .map((control) =>
        control.children
          ? { ...control, children: deleteControlById(control.children, id) }
          : control
      );
  };

  const handleDeleteControl = (id: string) => {
    const updated = deleteControlById(droppedControls, id);
    setDroppedControls(updated);
    if (selectedControlId === id) setSelectedControlId(null);
  };

  const handleDuplicateControl = (id: string, parentId: string | null) => {
    const duplicate = (
      controls: DroppedControl[],
      parentId: string | null
    ): DroppedControl[] => {
      return controls.flatMap((control) => {
        if (control.id === id) {
          const newControl = {
            ...control,
            id: `${control.type}-${Date.now()}`,
            config: { ...control.config },
            children: control.children ? [...control.children] : [],
          };
          return [control, newControl];
        }
        if (control.children) {
          return [{
            ...control,
            children: duplicate(control.children, control.id),
          }];
        }
        return [control];
      });
    };
    const updated = duplicate(droppedControls, parentId);
    setDroppedControls(updated);
  };

  // Drag-to-reorder children within a container
  const handleReorderChildControl = (
    parentId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    const reorderInContainer = (
      controls: DroppedControl[]
    ): DroppedControl[] => {
      return controls.map((control) => {
        if (control.id === parentId && control.children) {
          const newChildren = [...control.children];
          const [moved] = newChildren.splice(fromIndex, 1);
          newChildren.splice(toIndex, 0, moved);
          return { ...control, children: newChildren };
        } else if (control.children) {
          return { ...control, children: reorderInContainer(control.children) };
        }
        return control;
      });
    };
    setDroppedControls(prev => reorderInContainer(prev));
  };


  // Render controls recursively
  function renderControls(
      controls: DroppedControl[],
      parentId: string | null = null,
      isInsideContainer = false
    ): React.ReactNode {
        return controls.map((control, index) => {
          const isContainer = CONTAINER_TYPES.includes(control.type);
          const isAbsolute = !isInsideContainer;
          const isSelected = control.id === selectedControlId;

          // Modular: Choose the renderer component
          const ControlComponent = CONTROL_RENDERERS[control.type] || DroppedControlRenderer;

          // --- For children in containers, reorder by mouse drag ---
          const childDragEvents =
            isInsideContainer && !isContainer
              ? {
                  onMouseDown: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    setChildDrag({
                      parentId: parentId!,
                      fromIndex: index,
                      y: e.clientY,
                    });
                  },
                }
              : {};

          return (
            <Box
              key={control.id}
              data-draggable-child={isInsideContainer && !isContainer ? "true" : undefined}
              sx={{
                ...(isAbsolute
                  ? {
                      position: 'absolute',
                      top: control.position?.y ?? 1,
                      left: control.position?.x ?? 1,
                      width: isContainer ? '98%' : 260,
                      minHeight: isContainer ? 300 : undefined,
                      p: 1,
                      mb: 1,
                      backgroundColor: isContainer ? '#fafbfc' : 'white',
                      border: isSelected
                        ? '2px solid #1976d2'
                        : isContainer
                        ? '1.5px dashed #b8c0c9'
                        : childDrag && childDrag.fromIndex === index
                        ? '2px dashed #1976d2'
                        : '1px dashed transparent',
                      cursor: isSelected ? 'move' : 'pointer',
                    }
                  : {
                      position: 'relative',
                      width: '100%',
                      mb: 1,
                      p: 1,
                      backgroundColor:
                        childDrag && childDrag.fromIndex === index
                          ? '#e3f2fd'
                          : isContainer
                          ? '#fafbfc'
                          : 'white',
                      minHeight: isContainer ? 200 : undefined,
                      border: isSelected
                        ? '2px solid #1976d2'
                        : isContainer
                        ? '1.5px dashed #b8c0c9'
                        : childDrag && childDrag.fromIndex === index
                        ? '2px dashed #1976d2'
                        : '1px dashed transparent',
                      opacity: childDrag && childDrag.fromIndex === index ? 0.5 : 1,
                      cursor: isInsideContainer && !isContainer ? "grab" : "pointer",
                    }),
                borderRadius: 1,
                zIndex: isInsideContainer ? 2 : 1,
                '&:hover': {
                  borderColor: '#1976d2',
                },
              }}
              {...(isAbsolute
                ? { onMouseDown: (e: React.MouseEvent) => handleStartDrag(e, control.id) }
                : childDragEvents)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedControlId(control.id);
              }}
              // Accept drop from palette if container
              onDrop={isContainer ? (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDrop(e, control.id); 
              } : undefined}
            >       
                
                {/* Action icons only if selected */}
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-8px',
                      right: '10px',
                      display: 'flex',
                      gap: 1,
                      zIndex: 1000,
                      padding: 0.5,
                      borderRadius: 0.5,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      border: '1px solid #ccc',
                      backgroundColor: 'white',
                    }}
                  >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteControl(control.id);
                        }}
                        sx={{
                          padding: 0,
                          width: 10,
                          height: 10,
                          minHeight: 15,
                          backgroundColor: 'white',
                          border: 'none',
                          boxShadow: 'none',
                          color: 'rgba(0,0,0,0.4)',
                          '&:hover': {
                            color: '#f44336',
                            backgroundColor: 'white',
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateControl(control.id, parentId);
                        }}
                        sx={{
                          padding: 0,
                          width: 10,
                          height: 10,
                          minHeight: 15,
                          backgroundColor: 'white',
                          border: 'none',
                          boxShadow: 'none',
                          color: 'rgba(0,0,0,0.4)',
                          '&:hover': {
                            color: '#1976d2',
                            backgroundColor: 'white',
                          },
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
              {/* Snap lines for root controls */}
              {isAbsolute && isSelected && snapLines.x !== null && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: snapLines.x,
                    width: '2px',
                    height: '100%',
                    backgroundColor: '#1976d2',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 99,
                  }}
                />
              )}
              {isAbsolute && isSelected && snapLines.y !== null && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: snapLines.y,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#1976d2',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 99,
                  }}
                />
              )}

              {/* Modular Control Renderer */}
              <ControlComponent control={control}>
                {isContainer && control.children && (
                  <Box
                    sx={{
                      display: control.layout === 'row'
                        ? 'flex'
                        : control.layout === 'grid'
                        ? 'grid'
                        : 'flex',
                      flexDirection: control.layout === 'row' ? 'row' : 'column',
                      gap: 1,
                      width: '100%',
                      gridTemplateColumns:
                        control.layout === 'grid'
                          ? `repeat(${control.columns || 2}, 1fr)`
                          : undefined,
                      alignItems: 'stretch',
                      //outline: hoveredContainerId === control.id ? '2px solid #19d25dac' : 'none', // for highliging drag over container for debugging
                    }}
                    data-container-id={control.id}
                    onDragOver={isContainer ? (e) => {
                      e.preventDefault();
                      // Optional: add visual highlight on drag over // for debugging
                      //setHoveredContainerId(control.id);
                    } : undefined}
                    //Debugging: Remove hovered ID on drag leave
                    //onDragLeave={isContainer ? (e) => {
                   //   setHoveredContainerId(null); // Remove hovered ID on leave
                   // } : undefined}
                  >
                    {renderControls(control.children, control.id, true)}
                  </Box>
                )}
              </ControlComponent>
            </Box>
          );
        });
      }
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
      <FormsControlPalette />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          py: 0.5,
        }}
      >
        <Tooltip title="Clear Canvas" arrow>
          <IconButton
            onClick={() => setConfirmClearOpen(true)}
            size="small"
            sx={{ p: 0.3, borderRadius: 0.5, backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 12, color: 'red' }} />
          </IconButton>
        </Tooltip>

        <FormControlLabel
          control={<Switch checked={isPreview} size="small" onChange={(e) => setIsPreview(e.target.checked)} />}
          label="Preview Form"
          labelPlacement="start"
          sx={{ '& .MuiFormControlLabel-label': { fontSize: 13, fontWeight: 400 } }}
        />
      </Box>

      {/* Drop Zone for controls */}
      <Box
        ref={dropZoneRef}
        onDrop={(e) => handleDrop(e, null)} // root-level drop
        onDragOver={(e) => e.preventDefault()}
        sx={{
          border: '1px dashed #ccc',
          borderRadius: 0.5,
          position: 'relative',
          backgroundColor: 'grey.100',
          backgroundImage: `radial-gradient(circle, #bbb 1px, transparent 1px)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '20px 20px',
          p: 2,
          mb: 0,
          overflowY: 'auto',
          height: '500px',
          width: '100%',
        }}
      >
        {isPreview ? (
          <PreviewCanvas />
        ) : droppedControls.length > 0 ? (
          renderControls(sortedControls)
        ) : (
          <Typography variant="body2" color="text.secondary">
            Drag form controls here to build your form
          </Typography>
        )}
      </Box>

      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 0.5, p: 2 } } }}
      >
        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 400 }} gutterBottom>
            Do you really want to Nuke all your work?
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center' }}>
          <Button onClick={() => setConfirmClearOpen(false)} size="small" sx={{ fontSize: 12, fontWeight: 400, textTransform: 'none', borderRadius: 0.5, height: 30 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmClear} size="small" variant="contained" sx={{ fontSize: 12, fontWeight: 400, textTransform: 'none', borderRadius: 0.5, height: 30, backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}>
            Yes, Nuke it!
          </Button>
        </Box>
      </Dialog>
    </Paper>
  );
}
