import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
// apis
import * as favoritesRepo from '../apis/favoritesRepo';
// types
import type Favorite from '../../../../shared/types/Favorite';

/**
 * Return value of the {@link useFavorites} hook.
 *
 * @type {UseFavoritesReturn}
 *
 * @property {Favorite[]} favorites - The array of full Favorite objects.
 * @property {number[]} favoriteRomIds - An array of just the favorited ROM IDs.
 * @property {(romId: number) => Promise<void>} toggleFavorite - Toggles a ROM's favorite status.
 *
 * @example
 * const { favoriteRomIds, toggleFavorite } = useFavorites();
 */
type UseFavoritesReturn = {
  favorites: Favorite[];
  favoriteRomIds: number[];
  toggleFavorite: (romId: number) => Promise <void>;
};

/**
 * Handles the favorites state and interacts with the service layer to persist changes.
 * Integrates with Clerk's `useAuth()` to securely manage user sessions. 
 * On render and during any toggle actions, it dynamically retrieves the active user's 
 * session token and passes it to the repository layer. This ensures that the frontend 
 * only requests and mutates favorites belonging to the currently logged-in user.
 *
 * @returns {UseFavoritesReturn} The current favorites, rom IDs, and toggle function.
 *
 * @example
 * const { favoriteRomIds, toggleFavorite } = useFavorites();
 * return (
 * <CardList
 * cards={cardData}
 * favorites={favoriteRomIds}
 * onUpdateFavorites={toggleFavorite}
 * />
 * );
 */
const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = await getToken();
      if (token) {
        const data = await favoritesRepo.getFavorites(token);
        setFavorites(data);
      }
    };
    fetchFavorites();
  }, [getToken]);

  const toggleFavorite = async (romId: number): Promise <void> => {
    const token = await getToken();
    if (token) {
      await favoritesRepo.toggleFavorite(romId, token);
      const updatedFavorites = await favoritesRepo.getFavorites(token);
      setFavorites(updatedFavorites);
    }
  };

  const favoriteRomIds = favorites.map((fav) => fav.romId);

  return {
    favorites,
    favoriteRomIds,
    toggleFavorite,
  };
};

export default useFavorites;
