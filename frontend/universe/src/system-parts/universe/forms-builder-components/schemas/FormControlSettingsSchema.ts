export type ControlSettingType = 'text' | 'boolean' | 'select';

export interface ControlSetting {
  key: string;
  label: string;
  type: ControlSettingType;
  options?: string[];
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
    { key: 'title', label: 'Container Title', type: 'text' },
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
