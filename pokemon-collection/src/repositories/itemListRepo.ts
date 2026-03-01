const item = new Map<string, string[]>();

const getItems = (page: string): string[] => {
  return item.get(page) ?? [];
};

const setItems = (page: string, items: string[]): void => {
  item.set(page, [...items]);
};

export { getItems, setItems };
