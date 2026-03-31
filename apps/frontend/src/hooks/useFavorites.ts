import { useState, useEffect } from 'react';
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
 * Automatically loads initial favorites from the data layer on the first render and
 * keeps the local React state synchronized with the service.
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

  useEffect(() => {
    favoritesRepo.getFavorites().then(setFavorites);
  }, []);

  const toggleFavorite = async (romId: number): Promise <void> => {
    await favoritesRepo.toggleFavorite(romId);

    const updatedFavorites = await favoritesRepo.getFavorites();
    setFavorites(updatedFavorites);
  };

  const favoriteRomIds = favorites.map((fav) => fav.romId);

  return {
    favorites,
    favoriteRomIds,
    toggleFavorite,
  };
};

export default useFavorites;
