import { useState } from 'react';

/**
 * Props for the  {@link useSearchFilter} hook.
 *
 * @type {UseSearchFilterProps<T>}
 * @template T - The type of each item in the list.
 *
 * @property {T[]} items - The full list of items to filter.
 * @property {(item: T) => string} searchText - Function that returns the string to search within for each item.
 *
 * @example
 * useSearchFilter({
 *   items: roms,
 *   searchText: (rom) => rom.title,
 * });
 */
type UseSearchFilterProps<T> = {
  items: T[];
  searchText: (item: T) => string;
};

/**
 * Return value of the {@link useSearchFilter} hook.
 *
 * @type {ReturnSearch<T>}
 * @template T - The type of each filtered item.
 *
 * @property {string} searchQuery - The current search input value.
 * @property {React.Dispatch<React.SetStateAction<string>>} setSearchQuery - Setter for the search input.
 * @property {T[]} filteredItems - Items filtered by the current search; all items when search is empty.
 *
 * @example
 * const { searchQuery, setSearchQuery, filteredItems } = useSearchFilter({
 *   items: roms,
 *   searchText: (rom) => rom.title,
 * });
 *
 * return (
 *   <>
 *     <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
 *     {filteredItems.map((rom) => <Card key={rom.id} card={rom} />)}
 *   </>
 * );
 */
type ReturnSearch<T> = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: T[];
};

/**
 * Filters a list of items by a search string.
 * Search directly matches substrings. An empty search returns all items.
 *
 * @template T - The type of each item in the list.
 * @param {UseSearchFilterProps<T>} props - Props using items and searchText.
 * @returns {ReturnSearch<T>} searchQuery, setSearchQuery, and filteredItems.
 *
 * @example
 * const { searchQuery, setSearchQuery, filteredItems } = useSearchFilter({
 *   items: roms,
 *   searchText: (rom) => rom.title,
 * });
 *
 * return (
 *   <>
 *     <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
 *     {filteredItems.map((rom) => <Card key={rom.id} card={rom} />)}
 *   </>
 * );
 */
const useSearchFilter = <T>({
  items,
  searchText,
}: UseSearchFilterProps<T>): ReturnSearch<T> => {
  const [searchQuery, setSearchQuery] = useState('');

  const search = searchQuery.trim();

  const filteredItems =
    search === ''
      ? items
      : items.filter((item) =>
          searchText(item).toLowerCase().includes(search.toLowerCase()),
        );

  return { searchQuery, setSearchQuery, filteredItems };
};

export default useSearchFilter;
