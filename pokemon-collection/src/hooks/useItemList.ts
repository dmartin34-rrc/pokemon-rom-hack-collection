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

type UseItemListProps = {
  page: string;
};

type UseItemListReturn = {
  items: string[];
  addItem: (title: string) => void;
  removeItem: (title: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  addDrop: (e: React.DragEvent) => void;
  removeDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, title: string) => void;
  onDragStart: (e: React.DragEvent, title: string) => void;
};

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

  const addDrop = handleAddDrop(addItem);
  const removeDrop = handleRemoveDrop(removeItem);

  return {
    items,
    addItem,
    removeItem,
    handleDragOver,
    addDrop,
    removeDrop,
    handleDragStart,
    onDragStart,
  };
};

export default useItemList;
