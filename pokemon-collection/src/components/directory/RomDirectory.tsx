import { useState } from 'react';
// data
import cardData from '../../data/cardData.json';
// types
import type Filter from '../../types/Filter';
import type Rom from '../../types/Rom';
// helpers
import { filterRoms, getYearRange } from './helpers/filterRoms';
// components
import FilterForm from './FilterForm';
import CardListDirectory from './CardListDirectory';

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
        {filteredRoms.map((card) => {
          return <CardListDirectory title={card.title || ''} />;
        })}
      </div>
    </>
  );
};

export default RomDirectory;
