import { useState } from 'react';
import cardData from '../../data/cardData.json';
import type Filter from '../../types/Filter';
import type Rom from '../../types/Rom';
import { filterRoms, getYearRange } from './helpers/filterRoms';
import { PAGE_LIMIT, getTotalPages, getPage } from './helpers/pages';
import { handleDragOver, handleRemoveDrop } from './helpers/aside';
import FilterForm from './FilterForm';
import CardListDirectory from './CardListDirectory';
import Pagination from './Pagination';
import Aside from './Aside';

type Props = {
  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
};

const roms = cardData as Rom[];

const RomDirectory = ({ sharedMessage, setSharedMessage }: Props) => {
  const yearRange = getYearRange(roms);
  const [filter, setFilter] = useState<Filter>({
    title: '',
    tags: '',
    yearMinimum: yearRange.min,
    yearMaximum: yearRange.max,
    filterMultiplayer: null,
    filterCompleted: null,
  });

  const filteredRoms = filterRoms(roms, filter);

  const [page, setPage] = useState(1);
  const totalPages = getTotalPages(filteredRoms.length, PAGE_LIMIT);
  const pageRoms = getPage(filteredRoms, page, PAGE_LIMIT);

  const [readLater, setReadLater] = useState<string[]>([]);

  return (
    <div className="flex gap-6 p-4">
      <div
        className="flex-1 min-w-0"
        onDragOver={handleDragOver}
        onDrop={handleRemoveDrop(setReadLater)}
      >
        <div className="mb-4">
          <p>
            You are feeling: <strong>{sharedMessage || "not sure yet"}</strong>
          </p>

          <label>
            How are you feeling today?
            <input
              type="text"
              value={sharedMessage}
              onChange={(e) => setSharedMessage(e.target.value)}
              className="ml-2 border px-2 py-1"
              placeholder="Happy, excited, tired..."
            />
          </label>
        </div>

        <FilterForm
          filter={filter}
          setFilter={setFilter}
          yearMinimum={yearRange.min}
          yearMaximum={yearRange.max}
        />

        <div className="flex flex-wrap gap-6">
          {pageRoms.map((card) => (
            <CardListDirectory
              key={card.title}
              card={card}
              readLater={readLater}
              setReadLater={setReadLater}
            />
          ))}
        </div>

        {filteredRoms.length !== 0 ? (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(page: any) =>
              setPage(Math.max(1, Math.min(totalPages, page)))
            }
          />
        ) : null}
      </div>

      <Aside readLater={readLater} setReadLater={setReadLater} />
    </div>
  );
};

export default RomDirectory;
