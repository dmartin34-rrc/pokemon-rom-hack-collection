import { useState } from 'react';

type useSearchFilterProps<T> = {
  items: T[];
  searchText: (item: T) => string;
};

type ReturnSearch<T> = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: T[];
};

const useSearchFilter = <T>({
  items,
  searchText,
}: useSearchFilterProps<T>): ReturnSearch<T> => {
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
