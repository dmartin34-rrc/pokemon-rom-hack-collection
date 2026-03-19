// repositories
import * as itemListRepo from '../../../../../../pokemon-collection/src/repositories/itemListRepo';

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

  const newItems = currentItems.filter((item) => item !== title);

  console.log('removeItem', {
    before: currentItems,
    after: newItems,
  });

  itemListRepo.saveItems({ page, items: newItems });

  return newItems;
};

const clearItems = (page: string): string[] => {
  itemListRepo.clearItems(page);

  return [];
};

export { getItems, addItem, removeItem, clearItems };
