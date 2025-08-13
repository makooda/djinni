export type ControlSettingType = 'text' | 'boolean' | 'select';

export interface ControlSetting {
  key: string;
  label: string;
  type: ControlSettingType | 'color'; 
  options?: string[];
  unitOptions?: string[];
}

export const controlSettingsSchema: Record<string, ControlSetting[]> = {
  // ----- FIELDS -----
  text: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'inputType', label: 'Input Type', type: 'select', options: ['text', 'email', 'phone', 'number', 'password'] },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  dropdown: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'options', label: 'Options (comma separated)', type: 'text' },
    { key: 'defaultValue', label: 'Default Value', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  checkbox: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'checked', label: 'Checked by default', type: 'boolean' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  radio: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'options', label: 'Options (comma separated)', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  datepicker: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  textarea: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  toggle: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'defaultState', label: 'On by default', type: 'boolean' },
  ],
  uploader: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'accept', label: 'Accepted File Types (comma-separated)', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],
  signature: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'required', label: 'Required', type: 'boolean' },
  ],

  // ----- STATIC -----
  label: [
    { key: 'text', label: 'Text', type: 'text' },
  ],
  header: [
    { key: 'text', label: 'Header Text', type: 'text' },
    { key: 'level', label: 'Header Level', type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
  ],
  link: [
    { key: 'text', label: 'Link Text', type: 'text' },
    { key: 'url', label: 'URL', type: 'text' },
  ],
  image: [
    { key: 'src', label: 'Image URL', type: 'text' },
    { key: 'alt', label: 'Alt Text', type: 'text' },
  ],
  button: [
    { key: 'text', label: 'Button Text', type: 'text' },
    { key: 'color', label: 'Color', type: 'select', options: ['default', 'primary', 'secondary', 'error'] },
  ],
  qr_code: [
    { key: 'value', label: 'QR Code Value', type: 'text' },
  ],
  static_content: [
    { key: 'html', label: 'HTML Content', type: 'text' },
  ],

  // ----- STRUCTURE -----
  card: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'showBorder', label: 'Show Border', type: 'boolean' },
    { key: 'showShadow', label: 'Show Shadow', type: 'boolean' },
    { key: 'collapsible', label: 'Collapsible', type: 'boolean' },
    { key: 'background', label: 'Background Color', type: 'text' },
  ],
  container: [
      { key: 'label', label: 'Container Label', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'showLabel', label: 'Show Label', type: 'boolean' },
      { key: 'showDivider', label: 'Show Divider', type: 'boolean' },
      { key: 'direction', label: 'Direction', type: 'select', options: ['row', 'column'] },
      { key: 'gap', label: 'Gap Between Items', type: 'text' },
      { key: 'align', label: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] },
      { key: 'justify', label: 'Justify Content', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
      { key: 'wrap', label: 'Wrap', type: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
      { key: 'padding', label: 'Padding', type: 'text', unitOptions: ['px', '%', 'em', 'rem']},
      { key: 'margin', label: 'Margin', type: 'text' },
      { key: 'minHeight', label: 'Min Height', type: 'text' },
      { key: 'minWidth', label: 'Min Width', type: 'text' },
      { key: 'maxHeight', label: 'Max Height', type: 'text' },
      { key: 'maxWidth', label: 'Max Width', type: 'text' },
      { key: 'border', label: 'Border', type: 'text' },
      { key: 'borderRadius', label: 'Border Radius', type: 'text' },
      { key: 'background', label: 'Background Color', type: 'color' },
      { key: 'boxShadow', label: 'Box Shadow', type: 'text' },
      { key: 'collapsible', label: 'Collapsible', type: 'boolean' },
      { key: 'defaultCollapsed', label: 'Collapsed by Default', type: 'boolean' },
    ],

  repeater: [
    { key: 'label', label: 'Repeater Label', type: 'text' },
  ],
  table: [
    { key: 'label', label: 'Table Label', type: 'text' },
  ],
  tab: [
    { key: 'label', label: 'Tab Label', type: 'text' },
  ],
  wizard: [
    { key: 'label', label: 'Wizard Label', type: 'text' },
  ],
  wizard_step: [
    { key: 'label', label: 'Step Label', type: 'text' },
  ],
};
