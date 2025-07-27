import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
  Divider,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/InputOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import ListIcon from '@mui/icons-material/ListAltOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import NotesIcon from '@mui/icons-material/Notes';
import GestureIcon from '@mui/icons-material/Gesture';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import LabelIcon from '@mui/icons-material/Label';
import LinkIcon from '@mui/icons-material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SmartButtonIcon from '@mui/icons-material/SmartButton';

import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';         // Card
import Crop75Icon from '@mui/icons-material/Crop75';                 // Container
import RepeatIcon from '@mui/icons-material/Repeat';                 // Repeater
import TableChartIcon from '@mui/icons-material/TableChart';        // Table
import TabIcon from '@mui/icons-material/Tab';                       // Tab
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'; // Wizard
import LooksOneIcon from '@mui/icons-material/LooksOne';            // Wizard Step



const fieldControls = [
  { type: 'text', label: 'Text Field', icon: <TextFieldsIcon sx={{ fontSize: 12 }} /> },
  { type: 'dropdown', label: 'Dropdown', icon: <ListIcon sx={{ fontSize: 12 }} /> },
  { type: 'date', label: 'Date Picker', icon: <CalendarMonthIcon sx={{ fontSize: 12 }} /> },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckBoxIcon sx={{ fontSize: 12 }} /> },
  { type: 'radio', label: 'Radio Group', icon: <RadioButtonCheckedIcon sx={{ fontSize: 12 }} /> },
  { type: 'textarea', label: 'Textarea', icon: <NotesIcon sx={{ fontSize: 12 }} /> },
  { type: 'signature', label: 'Signature', icon: <GestureIcon sx={{ fontSize: 12 }} /> },
  { type: 'upload', label: 'Uploader', icon: <CloudUploadIcon sx={{ fontSize: 12 }} /> },
  { type: 'toggle', label: 'Toggle', icon: <ToggleOnIcon sx={{ fontSize: 12 }} /> },
];

// Static controls definition
const staticControls = [
  { type: 'button', label: 'Button', icon: <SmartButtonIcon sx={{ fontSize: 12 }} /> },
  { type: 'header', label: 'Header', icon: <TitleIcon sx={{ fontSize: 12 }} /> },
  { type: 'image', label: 'Image', icon: <ImageIcon sx={{ fontSize: 12 }} /> },
  { type: 'label', label: 'Label', icon: <LabelIcon sx={{ fontSize: 12 }} /> },
  { type: 'link', label: 'Link', icon: <LinkIcon sx={{ fontSize: 12 }} /> },
  { type: 'qrcode', label: 'QR Code', icon: <QrCodeIcon sx={{ fontSize: 12 }} /> },
  { type: 'static', label: 'Static Content', icon: <TextSnippetIcon sx={{ fontSize: 12 }} /> },
];

const structureControls = [
  { type: 'card', label: 'Card', icon: <ViewAgendaIcon sx={{ fontSize: 12 }} /> },
  { type: 'container', label: 'Container', icon: <Crop75Icon sx={{ fontSize: 12 }} /> },
  { type: 'repeater', label: 'Repeater', icon: <RepeatIcon sx={{ fontSize: 12 }} /> },
  { type: 'table', label: 'Table', icon: <TableChartIcon sx={{ fontSize: 12 }} /> },
  { type: 'tab', label: 'Tab', icon: <TabIcon sx={{ fontSize: 12 }} /> },
  { type: 'wizard', label: 'Wizard', icon: <AutoAwesomeMotionIcon sx={{ fontSize: 12 }} /> },
  { type: 'wizard_step', label: 'Wizard Step', icon: <LooksOneIcon sx={{ fontSize: 12 }} /> },
];


export default function FormsControlPalette() {
  const [expandedFields, setExpandedFields] = useState(false);
  const [expandedStatic, setExpandedStatic] = useState(false);
  const [expandedStructure, setExpandedStructure] = useState(false);


  //const handleToggle = () => setExpanded(prev => !prev);

  const handleDragStart = (e: React.DragEvent, controlType: string, label: string) => {
    const payload = JSON.stringify({ type: controlType, label });
    e.dataTransfer.setData('text/plain', payload);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Box>
      {/* Group Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          mb: 1,
          height: 30,
        }}
      >
        <Typography variant="caption" fontSize={13} fontWeight={500}>
          Fields
        </Typography>

        <IconButton
          size="small"
          onClick={() => setExpandedFields((prev) => !prev)}
          disableRipple
          sx={{
            border: 'none',
            p: 0.5,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {expandedFields ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowRightIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* Draggable Field Controls */}
      <Collapse in={expandedFields}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: 1,
            py: 0.5,
          }}
        >
          {fieldControls.map((ctrl) => (
            <Tooltip key={ctrl.type} title={ctrl.label} arrow>
              <Box
                draggable
                onDragStart={(e) => handleDragStart(e, ctrl.type, ctrl.label)}
                sx={{
                  px: 1,
                  py: 0.5,
                  fontSize: 11,
                  fontWeight: 400,
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: 'grey.400',
                  borderRadius: 0.5,
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.3,
                  '&:active': {
                    cursor: 'grabbing',
                  },
                }}
              >
                {ctrl.icon}
                {ctrl.label}
              </Box>
            </Tooltip>
          ))}
        </Box>
        </Collapse>
        {/* --- Static Group Header --- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          mb: 1,
          height: 30,
          mt: 1,
        }}
      >
      <Typography variant="caption" fontSize={13} fontWeight={500}>
        Static
      </Typography>

      <IconButton
          size="small"
          onClick={() => setExpandedStatic((prev)=> !prev)}
          disableRipple
          sx={{
            border: 'none',
            p: 0.5,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {expandedStatic ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowRightIcon fontSize="small" />
          )}
        </IconButton>
    </Box>

    {/* --- Static Controls --- */}
    <Collapse in={expandedStatic}>
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 1,
        py: 0.5,
      }}
    >
      {staticControls.map((ctrl) => (
        <Tooltip key={ctrl.type} title={ctrl.label} arrow>
          <Box
            draggable
            onDragStart={(e) => handleDragStart(e, ctrl.type, ctrl.label)}
            sx={{
              px: 1,
              py: 0.5,
              fontSize: 11,
              fontWeight: 400,
              backgroundColor: 'white',
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: 0.5,
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              gap: 0.3,
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            {ctrl.icon}
            {ctrl.label}
          </Box>
        </Tooltip>
      ))}
      </Box>
      </Collapse>
      {/* --- Structure Group Header --- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          backgroundColor: 'grey.200',
          borderRadius: 0.5,
          borderBottom: '1px solid',
          borderColor: 'grey.300',
          mb: 1,
          height: 30,
          mt: 1,
        }}
      >
        <Typography variant="caption" fontSize={13} fontWeight={500}>
          Structure
        </Typography>

        <IconButton
          size="small"
          onClick={()=> setExpandedStructure((prev) => !prev)}
          disableRipple
          sx={{
            border: 'none',
            p: 0.5,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {expandedStructure ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowRightIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

    {/* --- Structure Controls --- */}
    <Collapse in={expandedStructure}>
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 1,
        py: 0.5,
      }}
    >
      {structureControls.map((ctrl) => (
        <Tooltip key={ctrl.type} title={ctrl.label} arrow>
          <Box
            draggable
            onDragStart={(e) => handleDragStart(e, ctrl.type, ctrl.label)}
            sx={{
              px: 1,
              py: 0.5,
              fontSize: 11,
              fontWeight: 400,
              backgroundColor: 'white',
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: 0.5,
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              gap: 0.3,
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            {ctrl.icon}
            {ctrl.label}
          </Box>
        </Tooltip>
      ))}
    </Box>
    </Collapse>      
       <Divider sx={{ mt: 1, mb: 0.5 }} />
    </Box>
  );
}
