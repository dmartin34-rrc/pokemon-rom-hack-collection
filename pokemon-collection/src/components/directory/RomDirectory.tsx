import { useState } from 'react';
// data
import cardData from '../../data/cardData.json';
// types
import type Filter from '../../types/Filter';
import type Rom from '../../types/Rom';
// helpers
import { filterRoms, getYearRange } from './helpers/filterRoms';
import { PAGE_LIMIT, getTotalPages, getPage } from './helpers/pages';
// components
import FilterForm from './FilterForm';
import CardListDirectory from './CardListDirectory';
import Pagination from './Pagination';

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

  return (
    <>
      <div>
        <FilterForm
          filter={filter}
          setFilter={setFilter}
          yearMinimum={yearRange.min}
          yearMaximum={yearRange.max}
        />
      </div>

      <div>
        {pageRoms.map((card) => {
          return <CardListDirectory title={card.title || ''} />;
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
    </>
  );
};

export default RomDirectory;
