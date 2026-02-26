import { useState } from 'react';
// data
import cardData from '../../data/cardData.json';
// types
import type Filter from '../../types/Filter';
import type Rom from '../../types/Rom';
// helpers
import { filterRoms, getYearRange } from './helpers/filterRoms';
import { PAGE_LIMIT, getTotalPages, getPage } from './helpers/pages';
import {
  handleDragOver,
  handleRemoveDrop,
  addReadLater,
  removeReadLater,
  onDragStart,
} from './helpers/aside';
// components
import FilterForm from './FilterForm';
import CardList from '../card/CardList';
import Pagination from './Pagination';
import Aside from './Aside';

const roms = cardData as Rom[];

const RomDirectory = (): React.JSX.Element => {
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
  const [readLater, setReadLater] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const totalPages = getTotalPages(filteredRoms.length, PAGE_LIMIT);
  const pageRoms = getPage(filteredRoms, page, PAGE_LIMIT);

  return (
    <div className="flex gap-6 p-4">
      <div
        className="flex-1 min-w-0"
        onDragOver={handleDragOver}
        onDrop={handleRemoveDrop(setReadLater)}
      >
        <FilterForm
          filter={filter}
          setFilter={setFilter}
          yearMinimum={yearRange.min}
          yearMaximum={yearRange.max}
        />

        <CardList
          cards={pageRoms}
          readLaterWrapper={(card) => {
            const title = card.title || '';
            const inList = readLater.includes(title);

            return inList ? (
              <button
                className="text-sm text-slate-600 hover:text-red-600 border border-slate-300 rounded px-2 py-1"
                type="button"
                onClick={() =>
                  setReadLater((prev) => removeReadLater(prev, title))
                }
              >
                Remove from read later
              </button>
            ) : (
              <button
                className="text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded px-2 py-1"
                type="button"
                onClick={() =>
                  setReadLater((prev) => addReadLater(prev, title))
                }
              >
                Add to read later
              </button>
            );
          }}
          dragWrapper={(card: any) => {
            const title = card.title || '';

            return {
              className: 'relative group cursor-grab active:cursor-grabbing',
              draggable: true,
              onDragStart: (e: any) => {
                onDragStart(e, title);
              },
            };
          }}
        />

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
