// data
import cardData from '../data/cardData.json';
// types
import type Rom from '../types/Rom';

interface ItemList {
  page: string;
  items: string[];
}

const item = new Map<string, string[]>();

const getRoms = (): Rom[] => {
  return cardData as Rom[];
};

const getItems = (page: string): ItemList => {
  return { page, items: item.get(page) ?? [] };
};

// create + update
const saveItems = (list: ItemList): void => {
  item.set(list.page, [...list.items]);
};

const removeItems = (page: string): void => {
  item.delete(page);
};

export { getItems, saveItems, removeItems, getRoms };
export type { ItemList };
