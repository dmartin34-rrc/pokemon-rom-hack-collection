type RomDirectoryAsideProps = {
  items: string[];
  onRemove: (title: string) => void;
  onClear: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleAddDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, title: string) => void;
};

/**
 * The RomDirectoryAside uses the hook-service-repository architecture by:
 *
 * Indirectory implementing the use of the architecture through props. It receives onRemove and onClear as callbacks from its parent, RomDirectoryPage.
 * The callbacks come from useItemList (hook), the methods clearItems and removeItem, which are invoked from the itemListService and further invoked from itemListRepo.
 */
const RomDirectoryAside: React.FC<RomDirectoryAsideProps> = ({
  items,
  onRemove,
  onClear,
  handleDragOver,
  handleAddDrop,
  handleDragStart,
}): React.JSX.Element => {
  return (
    <aside
      className="w-64 shrink-0 border border-slate-300 rounded-lg p-4 bg-slate-50 min-h-[200px] sticky top-2 self-start"
      onDragOver={handleDragOver}
      onDrop={handleAddDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Read Later</h3>

        {items.length > 0 && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-red-600"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <ul className="space-y-2">
        {items.length == 0 ? (
          <li className="text-slate-500 text-sm">Drop ROMs here</li>
        ) : (
          items.map((title: string) => (
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
