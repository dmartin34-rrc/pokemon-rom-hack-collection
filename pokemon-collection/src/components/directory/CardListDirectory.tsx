// helpers
import { addReadLater, removeReadLater, onDragStart } from './helpers/aside';
// components
import Card from '../card/card';

const CardListDirectory = ({ card, readLater, setReadLater }: any) => {
  const title = card.title || "";
  const list = readLater.includes(title);

  return (
    <div
      className="relative group cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => {
        onDragStart(e, title);
      }}
    >
      <Card card={card} />

      <div className="mt-2">
        {list ? (
          <button
            className="text-sm text-slate-600 hover:text-red-600 border border-slate-300 rounded px-2 py-1"
            type="button"
            onClick={() =>
              setReadLater((prev: any) => removeReadLater(prev, title))
            }
          >
            Remove from read later
          </button>
        ) : (
          <button
            className="text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded px-2 py-1"
            type="button"
            onClick={() =>
              setReadLater((prev: any) => addReadLater(prev, title))
            }
          >
            Add to read later
          </button>
        )}
      </div>
    </div>
  );
};

export default CardListDirectory;
