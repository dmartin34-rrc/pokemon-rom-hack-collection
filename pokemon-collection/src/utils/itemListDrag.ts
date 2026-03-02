const DRAG_ROM = 'application/x-rom-directory-rom';
const DRAG_READ_LATER = 'application/x-rom-directory-watchlist';

const handleDragOver = (e: React.DragEvent): void => {
  e.preventDefault();

  e.dataTransfer.dropEffect = 'move';
};

const handleDragStart = (e: React.DragEvent, title: string): void => {
  e.dataTransfer.setData(DRAG_READ_LATER, JSON.stringify(title));

  e.dataTransfer.effectAllowed = 'move';
};

const onDragStart = (e: React.DragEvent, title: string): void => {
  e.dataTransfer.setData(DRAG_ROM, JSON.stringify(title));

  e.dataTransfer.effectAllowed = 'move';
};

const handleAddDrop =
  (onAdd: (title: string) => void) =>
  (e: React.DragEvent): void => {
    e.preventDefault();

    const romAside = e.dataTransfer.getData(DRAG_ROM);

    const title = JSON.parse(romAside);

    if (!romAside || !title) {
      return;
    }

    onAdd(title);
  };

const handleRemoveDrop =
  (onRemove: (title: string) => void) =>
  (e: React.DragEvent): void => {
    const romAside = e.dataTransfer.getData(DRAG_READ_LATER);

    const title = JSON.parse(romAside);

    if (!romAside || !title) {
      return;
    }

    onRemove(title);
  };

export {
  handleDragOver,
  handleDragStart,
  onDragStart,
  handleAddDrop,
  handleRemoveDrop,
};
