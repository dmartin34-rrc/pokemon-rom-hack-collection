import { useState } from 'react';
// data
import cardData from '../data/cardData.json';
// types
import type Filter from '../types/Filter';
// helpers
import {
  filterRoms,
  getYearRange,
} from '../components/directory/helpers/filterRoms';
import { getPage } from '../components/directory/helpers/pages';
import {
  handleDragOver,
  handleRemoveDrop,
  addReadLater,
  removeReadLater,
  onDragStart,
} from '../components/directory/helpers/aside';
// components
import FilterForm from '../components/directory/FilterForm';
import CardList from '../components/card/CardList';
import Pagination from '../components/directory/Pagination';
import RomDirectoryAside from '../components/directory/RomDirectoryAside';
import Button from '../components/ui/Button';

const roms = cardData;
const year = getYearRange(roms);
const PER_PAGE = 4;

const RomDirectory = (): React.JSX.Element => {
  const [filter, setFilter] = useState<Filter>({
    title: '',
    tags: '',
    yearMinimum: year.min,
    yearMaximum: year.max,
    filterMultiplayer: null,
    filterCompleted: null,
  });
  const [readLater, setReadLater] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filteredRoms = filterRoms(roms, filter);
  const currentPage = getPage(filteredRoms, page, PER_PAGE);

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
          yearMinimum={year.min}
          yearMaximum={year.max}
        />

        <CardList
          cards={currentPage}
          readLaterWrapper={(card) => {
            const title = card.title || '';
            const inList = readLater.includes(title);

            return inList ? (
              <Button
                className="text-sm text-slate-600 hover:text-red-600 border border-slate-300 rounded px-2 py-1"
                type="button"
                onClick={() =>
                  setReadLater((prev) => removeReadLater(prev, title))
                }
              >
                Remove from read later
              </Button>
            ) : (
              <Button
                className="text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded px-2 py-1"
                type="button"
                onClick={() =>
                  setReadLater((prev) => addReadLater(prev, title))
                }
              >
                Add to read later
              </Button>
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
            totalItems={filteredRoms.length}
            perPage={PER_PAGE}
            onPageChange={setPage}
          />
        ) : null}
      </div>

      <RomDirectoryAside readLater={readLater} setReadLater={setReadLater} />
    </div>
  );
};

export default RomDirectory;
