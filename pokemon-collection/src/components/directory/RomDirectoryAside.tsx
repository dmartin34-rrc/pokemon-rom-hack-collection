type RomDirectoryAsideProps = {
  items: string[];
  onRemove: (title: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleAddDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, title: string) => void;
};

const RomDirectoryAside: React.FC<RomDirectoryAsideProps> = ({
  items,
  onRemove,
  handleDragOver,
  handleAddDrop,
  handleDragStart,
}): React.JSX.Element => {
  return (
    <aside
      className="w-64 border border-slate-300 rounded-lg p-4 bg-slate-50 min-h-[200px]"
      onDragOver={handleDragOver}
      onDrop={handleAddDrop}
    >
      <h3 className="font-semibold mb-3 text-sm">Read Later</h3>

      <ul className="space-y-2">
        {items.length == 0 ? (
          <li className="text-slate-500 text-sm">Drop ROMs here</li>
        ) : (
          items.map((title: any) => (
            <li
              className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm cursor-grab active:cursor-grabbing"
              key={title}
              draggable
              onDragStart={(e) => handleDragStart(e, title)}
            >
              <span className="truncate flex-1">{title}</span>

              <button
                className="text-slate-500 hover:text-red-600 shrink-0"
                type="button"
                onClick={() => onRemove(title)}
              >
                x
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default RomDirectoryAside;
