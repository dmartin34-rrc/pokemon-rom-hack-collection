import { useState } from 'react';
// types
import type Filter from '../types/Filter';
import type Rom from '../types/Rom';
// services
import * as RomService from '../services/romService';
// repositories
import * as ItemListRepo from '../repositories/itemListRepo';
// hooks
import useSearchFilter from '../hooks/useSearchFilter';
import useItemList from '../hooks/useItemList';
// components
import FilterForm from '../components/directory/FilterForm';
import CardList from '../components/card/CardList';
import Pagination from '../components/directory/Pagination';
import RomDirectoryAside from '../components/directory/RomDirectoryAside';
import Button from '../components/ui/Button';
import SearchBar from '../layouts/header/SearchBar';

const roms = ItemListRepo.getRoms();
const year = RomService.getYearRange(roms);
const PER_PAGE = 4;

/**
 * The RomDirectoryPage uses the hook-service-repository architecture by:
 *
 * useItemList being a custom hook that manages item list state in the form of a read later aside for ROMs.
 *
 * This calls ItemListService to handle the business logic for adding to the reading list, removing from it, and clearing the list in its entirety.
 *
 * ItemListRepo temporarily provides in-memory data modified via CRUD methods and supplies the testing data from cardData.json via getRoms
 * directly for filtering, search, and pagination but is otherwise invoked indirectly for the read later list through the custom useItemList hook.
 */
const RomDirectory = (): React.JSX.Element => {
  const [filter, setFilter] = useState<Filter>({
    tags: '',
    yearMinimum: year.min,
    yearMaximum: year.max,
    filterMultiplayer: null,
    filterCompleted: null,
  });
  const [page, setPage] = useState(1);

  const {
    items: readLater,
    addItem: addReadLater,
    removeItem: removeReadLater,
    clearItems: clearReadLater,
    handleDragOver,
    addDrop,
    removeDrop,
    handleDragStart,
    onDragStart,
  } = useItemList({ page: 'readLater' });

  const filteredRoms = RomService.filterRoms(roms, filter);

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: searchedRoms,
  } = useSearchFilter<Rom>({
    items: filteredRoms,
    searchText: (rom) => rom.title ?? '',
  });

  const currentPage = RomService.getPage(searchedRoms, page, PER_PAGE);

  return (
    <div className="flex gap-6 p-4">
      <div
        className="flex-1 min-w-0"
        onDragOver={handleDragOver}
        onDrop={removeDrop}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search ROMs..."
        />

        <FilterForm
          filter={filter}
          setFilter={setFilter}
          onReset={() =>
            setFilter({
              tags: '',
              yearMinimum: year.min,
              yearMaximum: year.max,
              filterMultiplayer: null,
              filterCompleted: null,
            })
          }
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
                onClick={() => removeReadLater(title)}
              >
                Remove from read later
              </Button>
            ) : (
              <Button
                className="text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded px-2 py-1"
                type="button"
                onClick={() => addReadLater(title)}
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

      <RomDirectoryAside
        items={readLater}
        onRemove={removeReadLater}
        onClear={clearReadLater}
        handleDragOver={handleDragOver}
        handleAddDrop={addDrop}
        handleDragStart={handleDragStart}
      />
    </div>
  );
};

export default RomDirectory;
