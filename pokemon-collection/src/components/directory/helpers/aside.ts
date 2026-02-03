import type { Dispatch, SetStateAction } from 'react';

export const DRAG_ROM = 'application/x-rom-directory-rom';
export const DRAG_READ_LATER = 'application/x-rom-directory-watchlist';

export const addReadLater = (list: string[], title: string): string[] => {
  return list.includes(title) ? list : [...list, title];
};
export const removeReadLater = (list: string[], title: string): string[] => {
  return list.filter((t) => t !== title);
};

export const handleDragOver = (e: React.DragEvent): void => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDragStart = (e: React.DragEvent, title: string) => {
  e.dataTransfer.setData(DRAG_READ_LATER, JSON.stringify(title));
  e.dataTransfer.effectAllowed = 'move';
};

export const onDragStart = (e: React.DragEvent, title: string) => {
  e.dataTransfer.setData(DRAG_ROM, JSON.stringify(title));
  e.dataTransfer.effectAllowed = 'move';
};

export const handleAddDrop =
  (setReadLater: Dispatch<SetStateAction<string[]>>) =>
  (e: React.DragEvent) => {
    e.preventDefault();

    const romAside = e.dataTransfer.getData(DRAG_ROM);
    const title = JSON.parse(romAside);

    if (!romAside || !title) {
      return;
    }

    return setReadLater((prev) => addReadLater(prev, title));
  };

export const handleRemoveDrop =
  (setReadLater: Dispatch<SetStateAction<string[]>>) =>
  (e: React.DragEvent) => {
    const romAside = e.dataTransfer.getData(DRAG_READ_LATER);
    const title = JSON.parse(romAside);

    if (!romAside || !title) {
      return;
    }

    return setReadLater((prev) => prev.filter((t) => t != title));
  };
