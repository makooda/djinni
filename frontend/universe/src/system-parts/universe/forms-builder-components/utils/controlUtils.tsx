import { Console } from "console";
import { DroppedControl } from "../wrappers/FormsBuilderWrapper";


export function updateControlConfigRecursive(
  controls: DroppedControl[],
  id: string,
  updates: Record<string, any>
): DroppedControl[] {
  return controls.map((ctrl) => {
    if (ctrl.id === id) {
      const { layout, columns, ...restUpdates } = updates;
      console.log(`Updating control with id ${id} with updates:`, restUpdates);
      return {
        ...ctrl,
        ...(layout !== undefined ? { layout } : {}),
        ...(columns !== undefined ? { columns } : {}),
        config: { ...ctrl.config, ...restUpdates },
      } as DroppedControl; // Cast to DroppedControl
    }
    if (ctrl.children) {
      console.log(`Control with id ${id} not found in children of control with id ${ctrl.id}`);
      return { ...ctrl, children: updateControlConfigRecursive(ctrl.children, id, updates) };
    }
    return ctrl;
  });
}

export function findControlById(
  controls: DroppedControl[],
  id: string | null
): DroppedControl | null {
  if (!id) return null;
  for (const ctrl of controls) {
    if (ctrl.id === id) return ctrl;
    if (ctrl.children) {
      const found = findControlById(ctrl.children, id);
      if (found) return found;
    }
  }
  return null;
}

/** 
 * Moves an item within the array at `parentId` from fromIndex → toIndex
 */
export function reorderControl(
  controls: DroppedControl[],
  parentId: string | null,
  fromIndex: number,
  toIndex: number
): DroppedControl[] {
  if (!parentId) {
    const arr = [...controls];
    const [moved] = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, moved);
    return arr;
  }
  return controls.map((ctrl) => {
    if (ctrl.id === parentId && ctrl.children) {
      const arr = [...ctrl.children];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return { ...ctrl, children: arr };
    }
    if (ctrl.children) {
      return { ...ctrl, children: reorderControl(ctrl.children, parentId, fromIndex, toIndex) };
    }
    return ctrl;
  });
}
