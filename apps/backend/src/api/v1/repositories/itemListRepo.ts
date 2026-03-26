// data
import cardData from '../../../../../../shared/data/cardData.json';
// types
import type Rom from '../../../../../../shared/types/Rom';

interface ItemList {
  page: string;
  items: string[];
}

const item = new Map<string, string[]>();

const getRoms = (): Rom[] => {
  return cardData as Rom[];
};

const getItems = (page: string): ItemList => {
  console.log('getItems', { page, items: item.get(page) ?? [] });

  return { page, items: item.get(page) ?? [] };
};

// create + update
const saveItems = (list: ItemList): void => {
  console.log('saveItems', list);

  item.set(list.page, [...list.items]);
};

// clears list
const clearItems = (page: string): void => {
  console.log('clearItems', {
    cleared: item.get(page) ?? [],
  });

  item.delete(page);
};

export { getItems, saveItems, clearItems, getRoms };
export type { ItemList };
