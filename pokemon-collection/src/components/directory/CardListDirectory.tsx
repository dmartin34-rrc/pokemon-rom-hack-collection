// helpers
import { addReadLater, removeReadLater, onDragStart } from './helpers/aside';
// components
import Card from '../card/Card';

const CardListDirectory = ({ title, readLater, setReadLater }: any) => {
  const list = readLater.includes(title);

  return (
    <div
      draggable
      onDragStart={(e) => {
        onDragStart(e, title);
      }}
    >
      <Card title={title} />

      <div>
        {list ? (
          <button
            type="button"
            onClick={() =>
              setReadLater((prev: any) => removeReadLater(prev, title))
            }
          >
            Remove from read later
          </button>
        ) : (
          <button
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
