const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const ROMDIRECTORY_ENDPOINT = '/romdirectory';

type ItemListResponseJSON = {
  status: string;
  message?: string;
  data?: string[];
};

const getItems = async (page: string): Promise<string[]> => {
  const query = new URLSearchParams({ page });

  const itemResponse: Response = await fetch(
    `${BASE_URL}${ROMDIRECTORY_ENDPOINT}/?${query}`,
  );

  if (!itemResponse.ok) {
    throw new Error('Failed to fetch items');
  }

  const json: ItemListResponseJSON = await itemResponse.json();

  return json.data ?? [];
};

const addItem = async (page: string, title: string): Promise<string[]> => {
  const itemResponse: Response = await fetch(
    `${BASE_URL}${ROMDIRECTORY_ENDPOINT}/roms`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, title }),
    },
  );

  if (!itemResponse.ok) {
    throw new Error('Failed to add ROM');
  }

  const json: ItemListResponseJSON = await itemResponse.json();

  return json.data ?? [];
};

const removeItem = async (page: string, title: string): Promise<string[]> => {
  const itemResponse: Response = await fetch(
    `${BASE_URL}${ROMDIRECTORY_ENDPOINT}/roms`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, title }),
    },
  );

  if (!itemResponse.ok) {
    throw new Error('Failed to remove ROM');
  }

  const json: ItemListResponseJSON = await itemResponse.json();

  return json.data ?? [];
};

// clears list
const clearItems = async (page: string): Promise<string[]> => {
  const query = new URLSearchParams({ page });

  const itemResponse: Response = await fetch(
    `${BASE_URL}${ROMDIRECTORY_ENDPOINT}/?${query}`,
    { method: 'DELETE' },
  );

  if (!itemResponse.ok) {
    throw new Error('Failed to clear items');
  }

  const json: ItemListResponseJSON = await itemResponse.json();

  return json.data ?? [];
};

export { getItems, addItem, removeItem, clearItems };
