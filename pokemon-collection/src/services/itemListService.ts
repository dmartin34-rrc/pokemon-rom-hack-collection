// repositories
import * as itemListRepo from '../repositories/itemListRepo';

const getItems = (page: string): string[] => {
  return itemListRepo.getItems(page);
};

const addItem = (page: string, title: string): string[] => {
  const currentItems = itemListRepo.getItems(page);

  if (currentItems.includes(title)) {
    return currentItems;
  }

  const newItems = [...currentItems, title];

  itemListRepo.setItems(page, newItems);

  return newItems;
};

const removeItem = (page: string, title: string): string[] => {
  const currentItems = itemListRepo.getItems(page);

  const newItems = currentItems.filter((items) => items !== title);

  itemListRepo.setItems(page, newItems);

  return newItems;
};

export { getItems, addItem, removeItem };
