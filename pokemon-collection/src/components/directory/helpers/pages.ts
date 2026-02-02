export const PAGE_LIMIT = 4;

export const getTotalPages = (totalItems: number, perPage: number): number =>
  Math.max(1, Math.ceil(totalItems / perPage));

export const getPage = <T>(items: T[], page: number, perPage: number): T[] => {
  const startPage = (page - 1) * perPage;
  return items.slice(startPage, startPage + perPage);
};
