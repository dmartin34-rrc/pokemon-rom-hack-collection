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
    <aside onDragOver={handleDragOver} onDrop={handleAddDrop(setReadLater)}>
      <h3>Read Later</h3>

      <ul>
        {readLater.length == 0 ? (
          <li>Drop ROMs here</li>
        ) : (
          readLater.map((title: any) => (
            <li draggable onDragStart={(e) => handleDragStart(e, title)}>
              <span>{title} </span>

              <button type="button" onClick={() => remove(title)}>
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
