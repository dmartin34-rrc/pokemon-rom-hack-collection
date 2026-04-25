import { useAuth } from '@clerk/clerk-react';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
// types
import type Filter from '../../../../shared/types/Filter';
import type Rom from '../../../../shared/types/Rom';
// services
import * as RomService from '../../../backend/src/api/v1/services/romService';
import { getSeedRoms } from '../apis/romRepo';
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
  const { isSignedIn, isLoaded } = useAuth();
  const authenticateReadLater = Boolean(isLoaded && isSignedIn);

  const [roms, setRoms] = useState<Rom[]>([]);
  const [filter, setFilter] = useState<Filter>({
    tags: '',
    yearMinimum: 0,
    yearMaximum: new Date().getFullYear(),
    filterMultiplayer: null,
    filterCompleted: null,
  });
  const [page, setPage] = useState(1);
  const year = RomService.getYearRange(roms);

  useEffect(() => {
    const loadRoms = async () => {
      try {
        const catalog = await getSeedRoms();
        setRoms(catalog);
        const range = RomService.getYearRange(catalog);
        setFilter((prev) => ({
          ...prev,
          yearMinimum: range.min,
          yearMaximum: range.max,
        }));
      } catch {
        setRoms([]);
      }
    };

    void loadRoms();
  }, []);

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
        onDragOver={authenticateReadLater ? handleDragOver : undefined}
        onDrop={authenticateReadLater ? removeDrop : undefined}
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
              yearMinimum: RomService.getYearRange(roms).min,
              yearMaximum: RomService.getYearRange(roms).max,
              filterMultiplayer: null,
              filterCompleted: null,
            })
          }
          yearMinimum={year.min}
          yearMaximum={year.max}
        />

        <CardList
          cards={currentPage}
          readLaterWrapper={
            authenticateReadLater
              ? (card) => {
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
                }
              : undefined
          }
          dragWrapper={
            authenticateReadLater
              ? (card: Rom) => {
                  const title = card.title || '';

                  return {
                    className:
                      'relative group cursor-grab active:cursor-grabbing',
                    draggable: true,
                    onDragStart: (e: React.DragEvent) => {
                      onDragStart(e, title);
                    },
                  };
                }
              : undefined
          }
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

      {authenticateReadLater ? (
        <RomDirectoryAside
          items={readLater}
          onRemove={removeReadLater}
          onClear={clearReadLater}
          handleDragOver={handleDragOver}
          handleAddDrop={addDrop}
          handleDragStart={handleDragStart}
        />
      ) : (
        <aside className="w-64 shrink-0 border border-slate-200 rounded-lg p-4 bg-slate-50 min-h-[200px] sticky top-2 self-start">
          <h3 className="font-semibold text-sm mb-2">Read Later</h3>
          <p className="text-slate-600 text-sm mb-3">
            Wanna save ROMs to read for later? Sign in to access full features!
          </p>
          <NavLink
            to="/login"
            className="text-sm font-medium text-slate-800 underline hover:text-slate-950"
          >
            Log in
          </NavLink>
        </aside>
      )}
    </div>
  );
};

export default RomDirectory;
