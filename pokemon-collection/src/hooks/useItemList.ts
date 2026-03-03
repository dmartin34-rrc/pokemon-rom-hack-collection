import { useState } from 'react';
// services
import * as ItemListService from '../services/itemListService';
// utils
import {
  handleDragOver,
  handleDragStart,
  onDragStart,
  handleAddDrop,
  handleRemoveDrop,
} from '../utils/itemListDrag';

/**
 * Props for the {@link useItemList} hook.
 *
 * @type {UseItemListProps}
 *
 * @property {string} page - A key used to load and persist items for a specific page or list.
 *
 * @example
 * useItemList({ page: 'readLater' });
 */
type UseItemListProps = {
  page: string;
};

/**
 * Return value of the {@link useItemList} hook.
 *
 * @type {UseItemListReturn}
 *
 * @property {string[]} items - The current list of items for the given page.
 * @property {(title: string) => void} addItem - Adds an item to the list.
 * @property {(title: string) => void} removeItem - Removes a specific item from the list.
 * @property {() => void} clearItems - Clears all items for the current page's list.
 * @property {(e: React.DragEvent) => void} handleDragOver - Prevents default dragover.
 * @property {(e: React.DragEvent) => void} addDrop - Adds the dragged item to the list.
 * @property {(e: React.DragEvent) => void} removeDrop - Removes the dragged item from the list.
 * @property {(e: React.DragEvent, title: string) => void} handleDragStart - Starts a drag interaction for an item using the drag handlers.
 *
 * @example
 * const {
 *   items: readLater,
 *   addItem: addReadLater,
 *   removeItem: removeReadLater,
 *   clearItems: clearReadLater,
 *   handleDragOver,
 *   addDrop,
 *   removeDrop,
 *   handleDragStart,
 *   onDragStart,
 * } = useItemList({ page: 'readLater' });
 *
 * return (
 *   <div
 *     onDragOver={handleDragOver}
 *     onDrop={addDrop}
 *   >
 *     {readLater.map((title) => (
 *       <div
 *         onDragStart={(e) => handleDragStart(e, title)}
 *       >
 *         {title}
 *       </div>
 *     ))}
 *   </div>
 * );
 */
type UseItemListReturn = {
  items: string[];
  addItem: (title: string) => void;
  removeItem: (title: string) => void;
  clearItems: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  addDrop: (e: React.DragEvent) => void;
  removeDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, title: string) => void;
  onDragStart: (e: React.DragEvent, title: string) => void;
};

/**
 * Handles a list of items that persist for a given page with helpers for adding/removing items and handling drag/drop between lists.
 *
 * Items are loaded and persisted through the `itemListService`
 * using the current page as its key.
 *
 * @param {UseItemListProps} props - Props using the page key for a list.
 * @returns {UseItemListReturn} The current items and handlers for list and drag/drop operations.
 *
 * @example
 * const readLaterList = useItemList({ page: 'readLater' });
 *
 * Add item to reading list:
 * readLaterList.addItem('PokeSouls');
 *
 * Remove item from reading list (via drag/drop or button):
 * readLaterList.removeItem('Pokemon Infinity');
 *
 * Clear all items from reading list (via button):
 * readLaterList.clearItems();
 */
const useItemList = ({ page }: UseItemListProps): UseItemListReturn => {
  const [items, setItems] = useState<string[]>(() =>
    ItemListService.getItems(page),
  );

  const addItem = (title: string): void => {
    setItems(ItemListService.addItem(page, title));
  };

  const removeItem = (title: string): void => {
    setItems(ItemListService.removeItem(page, title));
  };

  const clearItems = (): void => {
    setItems(ItemListService.clearItems(page));
  };

  const addDrop = handleAddDrop(addItem);
  const removeDrop = handleRemoveDrop(removeItem);

  return {
    items,
    addItem,
    removeItem,
    clearItems,
    handleDragOver,
    addDrop,
    removeDrop,
    handleDragStart,
    onDragStart,
  };
};

export default useItemList;
