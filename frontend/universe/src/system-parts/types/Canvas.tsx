// types/canvas.ts
export type DroppedControl = {
  id: string;
  type: string;
  label?: string;
  options?: string[]; // for dropdown, radio, etc.
};