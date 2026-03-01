// repositories
import * as itemListRepo from '../repositories/itemListRepo';

const getValidTitles = (): string[] => {
  return itemListRepo
    .getRoms()
    .map((rom) => rom.title)
    .filter(Boolean);
};

const getItems = (page: string): string[] => {
  return itemListRepo.getItems(page).items;
};

const addItem = (page: string, title: string): string[] => {
  const currentItems = getItems(page);
  const validTitles = getValidTitles();

  if (currentItems.includes(title) || !validTitles.includes(title)) {
    return currentItems;
  }

  const newItems = [...currentItems, title];

  itemListRepo.saveItems({ page, items: newItems });

  return newItems;
};

const removeItem = (page: string, title: string): string[] => {
  const currentItems = getItems(page);

  const newItems = currentItems.filter((items) => items !== title);

  itemListRepo.saveItems({ page, items: newItems });

  return newItems;
};

export { getItems, addItem, removeItem };
