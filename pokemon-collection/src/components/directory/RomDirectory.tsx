import { useState } from 'react';
// data
import cardData from '../../data/cardData.json';
// types
import type Filter from '../../types/Filter';
import type Rom from '../../types/Rom';
// helpers
import { filterRoms, getYearRange } from './helpers/filterRoms';
import { PAGE_LIMIT, getTotalPages, getPage } from './helpers/pages';
import { handleDragOver, handleRemoveDrop } from './helpers/aside';
// components
import FilterForm from './FilterForm';
import CardListDirectory from './CardListDirectory';
import Pagination from './Pagination';
import Aside from './Aside';

const roms = cardData as Rom[];

const RomDirectory = () => {
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
    <>
      <div onDragOver={handleDragOver} onDrop={handleRemoveDrop(setReadLater)}>
        <FilterForm
          filter={filter}
          setFilter={setFilter}
          yearMinimum={yearRange.min}
          yearMaximum={yearRange.max}
        />

        <div>
          {pageRoms.map((card) => {
            return (
              <CardListDirectory
                title={card.title || ''}
                readLater={readLater}
                setReadLater={setReadLater}
              />
            );
          })}
        </div>

        {filteredRoms.length != 0 ? (
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
    </>
  );
};

export default RomDirectory;
