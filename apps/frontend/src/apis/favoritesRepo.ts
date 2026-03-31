import Favorite from "../../../../shared/types/Favorite";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const FAVORITES_ENDPOINT = '/favorites';

type FavoritesResponseJSON = {
  status: string;
  message?: string;
  data?: Favorite | Favorite[];
};

const getFavorites = async (): Promise<Favorite[]> => {
  const favoriteResponse: Response = await fetch(`${BASE_URL}${FAVORITES_ENDPOINT}`);

  if (!favoriteResponse.ok) {
    throw new Error('Failed to fetch Favorites');
  }

  const json: FavoritesResponseJSON = await favoriteResponse.json();
  return (json.data as Favorite[]) ?? [];
};

const toggleFavorite = async (romId: number): Promise<Favorite | null> => {
  const favoriteResponse: Response = await fetch(`${BASE_URL}${FAVORITES_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ romId }),
  });

  if (!favoriteResponse.ok) {
    throw new Error('Failed to toggle favorite');
  }

  const json: FavoritesResponseJSON = await favoriteResponse.json();
  return (json.data as Favorite) ?? null;
};

export { getFavorites, toggleFavorite };