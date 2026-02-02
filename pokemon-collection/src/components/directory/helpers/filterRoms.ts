// types
import type Rom from '../../../types/Rom';
import type Filter from '../../../types/Filter';

export const getYearRange = (roms: Rom[]): { min: number; max: number } => {
  const years = roms.map((r) => r.year).filter((y) => typeof y == 'number');

  if (!years.length) {
    return { min: 0, max: new Date().getFullYear() };
  }

  return { min: Math.min(...years), max: Math.max(...years) };
};

const filterTitle = (title: string | undefined, query: string): boolean => {
  if (!query) {
    return true;
  }

  if (!title) {
    return false;
  }

  return title.toLowerCase().includes(query.toLowerCase().trim());
};

const filterTags = (tags: string[] | undefined, query: string): boolean => {
  if (!query) {
    return true;
  }

  if (!tags?.length) {
    return false;
  }

  const searchTags = query.split(',').map((tag) => {
    return tag.trim();
  });

  if (!searchTags.length) {
    return true;
  }

  return searchTags.every((query) => tags.some((tag) => tag.includes(query)));
};

const filterYear = (
  year: number | undefined,
  minimum: number,
  maximum: number
): boolean => {
  year = year ?? 0;

  return year >= minimum && year <= maximum;
};

const filterCheckbox = (
  value: boolean | undefined,
  filter: boolean | null
): boolean => {
  if (filter == null) {
    return true;
  }
  return value === filter;
};

export const filterRoms = (roms: Rom[], filter: Filter): Rom[] => {
  return roms.filter((rom) => {
    if (
      !filterTitle(rom.title, filter.title) ||
      !filterTags(rom.tags, filter.tags) ||
      !filterYear(rom.year, filter.yearMinimum, filter.yearMaximum) ||
      !filterCheckbox(rom.multiplayer, filter.filterMultiplayer)
    ) {
      return false;
    }

    return true;
  });
};
