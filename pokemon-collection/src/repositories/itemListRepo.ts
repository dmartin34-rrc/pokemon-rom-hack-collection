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

const getItems = (page: string): string[] => {
  return item.get(page) ?? [];
};

// create + update
const saveItems = (page: string, items: string[]): void => {
  item.set(page, [...items]);
};

const removeItems = (page: string): void => {
  item.delete(page);
};

export { getItems, saveItems, removeItems, getRoms };
