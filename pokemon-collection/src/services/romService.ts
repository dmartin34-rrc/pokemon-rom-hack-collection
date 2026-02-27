import type Rom from '../types/Rom';
import type Filter from '../types/Filter';

export function getYearRange(roms: Rom[]) {
    const years = roms
      .map((rom) => rom.year)
      .filter((year) => typeof year == 'number');

    if (!years.length) {
      return { min: 0, max: new Date().getFullYear() };
  }

    return { min: Math.min(...years), max: Math.max(...years) };
}