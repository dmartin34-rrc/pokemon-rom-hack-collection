// helpers
import {
  removeReadLater,
  handleDragOver,
  handleDragStart,
  handleAddDrop,
} from './helpers/aside';

const Aside = ({ readLater, setReadLater }: any) => {
  const remove = (title: string) => {
    return setReadLater((prev: any) => removeReadLater(prev, title));
  };

  return (
    <aside
      className="w-64 border border-slate-300 rounded-lg p-4 bg-slate-50 min-h-[200px]"
      onDragOver={handleDragOver}
      onDrop={handleAddDrop(setReadLater)}
    >
      <h3 className="font-semibold mb-3 text-sm">Read Later</h3>

      <ul className="space-y-2">
        {readLater.length == 0 ? (
          <li className="text-slate-500 text-sm">Drop ROMs here</li>
        ) : (
          readLater.map((title: any) => (
            <li
              className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, title)}
            >
              <span className="truncate flex-1">{title} </span>

              <button
                className="text-slate-500 hover:text-red-600 shrink-0"
                type="button"
                onClick={() => remove(title)}
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

export default Aside;
