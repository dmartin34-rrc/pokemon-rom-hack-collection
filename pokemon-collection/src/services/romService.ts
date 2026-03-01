import type Rom from '../types/Rom';
import type Filter from '../types/Filter';

// Filter ROM Logic
export function getYearRange(roms: Rom[]) {
  const years = roms
    .map((rom) => rom.year)
    .filter((year) => typeof year == 'number');

  if (!years.length) {
    return { min: 0, max: new Date().getFullYear() };
  }

  return { min: Math.min(...years), max: Math.max(...years) };
}

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
  maximum: number,
): boolean => {
  year = year ?? 0;

  return year >= minimum && year <= maximum;
};

const filterCheckbox = (
  value: boolean | undefined,
  filter: boolean | null,
): boolean => {
  if (filter == null) {
    return true;
  }
  return value === filter;
};

export const filterRoms = (roms: Rom[], filter: Filter): Rom[] => {
  return roms.filter((rom) => {
    if (
      !filterTags(rom.tags, filter.tags) ||
      !filterYear(rom.year, filter.yearMinimum, filter.yearMaximum) ||
      !filterCheckbox(rom.multiplayer, filter.filterMultiplayer) ||
      !filterCheckbox(rom.completed, filter.filterCompleted)
    ) {
      return false;
    }

    return true;
  });
};

// Page Logic
export const getTotalPages = (totalItems: number, perPage: number): number =>
  Math.max(1, Math.ceil(totalItems / perPage));

export const getPage = <T>(items: T[], page: number, perPage: number): T[] => {
  const startPage = (page - 1) * perPage;
  return items.slice(startPage, startPage + perPage);
};

// Array Logic
export function checkIsDuplicate(
  currentRoms: Rom[],
  titleToCheck: string,
): boolean {
  if (!titleToCheck) return false;
  return currentRoms.some((r) => {
    if (!r.title) return false;
    return r.title.toLowerCase() === titleToCheck.toLowerCase();
  });
}

export function addRom(currentRoms: Rom[], newTitle: string): Rom[] {
  const newRom: Rom = {
    title: newTitle,
    percentComplete: 0,
  } as Rom;

  return [...currentRoms, newRom];
}

export async function deleteRom(currentRoms: Rom[], idToRemove: any) {
  return currentRoms.filter((c: any) => c.id !== idToRemove);
}
