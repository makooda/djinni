import React, { useState } from 'react';
import { Box, TextField, Button} from '@mui/material';
import UniverseTextField from '../../../comp/form-controls/UniverseTextField';
import UniverseSelect from '../../../comp/form-controls/UniverseSelect';
import UniverseCheckbox from '../../../comp/form-controls/UniverseCheckbox';
import UniverseRadio from '../../../comp/form-controls/UniverseRadio';
import { UniverseTextArea } from '../../../comp/form-controls/UniverseTextArea';
import { UniverseSwitch } from '../../../comp/form-controls/UniverseSwitch';
import UniverseDatePicker from '../../../comp/form-controls/UniverseDatePicker';

export default function AddGenericFormComponent({ item, onSubmit }: { item: any, onSubmit: () => void }) {
  const [defaultValue, setDefaultValue] = useState(item?.label || '');
  const [defaultSelect, setDefaultSelect] = useState(item?.value || '');
  const [defaultChecked, setDefaultChecked]= useState(false);
  const [defaultRadioSelect, setDefaultRadioSelect] = useState(item?.value||'');
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [defaultAreaValue, setDefaultAreaValue] = useState(item?.label|| '');

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <UniverseTextField
          labelText="My Label"
          fullWidth
          value={defaultValue}
          placeholder='Enter Label'
          onChange={(e) => setDefaultValue(e.target.value)}
          sx={{ mb: 1 }}
          required
          helperText={!defaultValue ? 'The field is required' : ''}        
          />

       <UniverseDatePicker
          labelText="Start Date"
          value={dateValue}
          onChange={(newDate: React.SetStateAction<Date | null>) => setDateValue(newDate)}
        />

        <UniverseSelect
        labelText="Select a Role"
        value={defaultSelect}
        onChange={(e) => setDefaultSelect(e.target.value)}
        sx={{mb:1}}
        required
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
        errorText="Role is required"
      />

      <UniverseTextArea
          label="My Label"
          value={defaultAreaValue}
          fullWidth
          onChange={(e) => setDefaultAreaValue(e.target.value)}
          sx={{mb:1}}
          required
          helperText={!defaultAreaValue?'The field is required': ''}
        >
          {defaultAreaValue}
        </UniverseTextArea>

      <UniverseCheckbox
        checked={defaultChecked}
        onChange={(e) => setDefaultChecked(e.target.checked)}
        label="Is Active"
      />

      <UniverseRadio
        labelText="Choose Gender"
        value={defaultRadioSelect}
        onChange={(e) => setDefaultRadioSelect(e.target.value)}
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
      />

      <UniverseSwitch
        label = "On/Off"
        value={true}
        />

    <Button type="submit" variant="contained">Save</Button>
    </Box>
  );
}