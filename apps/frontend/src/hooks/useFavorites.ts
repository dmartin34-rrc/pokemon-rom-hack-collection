import { useState } from 'react';
// services
import * as favoritesService from '../../../backend/src/api/v1/services/favoritesService';
// types
import type Favorite from '../../../../shared/types/Favorite';

/**
 * Return value of the {@link useFavorites} hook.
 *
 * @type {UseFavoritesReturn}
 *
 * @property {Favorite[]} favorites - The array of full Favorite objects.
 * @property {string[]} favoriteTitles - An array of just the favorited ROM titles.
 * @property {(title: string) => void} toggleFavorite - Toggles a ROM's favorite status.
 *
 * @example
 * const { favoriteTitles, toggleFavorite } = useFavorites();
 */
type UseFavoritesReturn = {
  favorites: Favorite[];
  favoriteTitles: string[];
  toggleFavorite: (title: string) => void;
};

/**
 * Handles the favorites state and interacts with the service layer to persist changes.
 * Automatically loads initial favorites from the data layer on the first render and
 * keeps the local React state synchronized with the service.
 *
 * @returns {UseFavoritesReturn} The current favorites, titles, and toggle function.
 *
 * @example
 * const { favoriteTitles, toggleFavorite } = useFavorites();
 * return (
 * <CardList
 * cards={cardData}
 * favorites={favoriteTitles}
 * onUpdateFavorites={toggleFavorite}
 * />
 * );
 */
const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Favorite[]>(() =>
    favoritesService.getAllFavorites(),
  );

  const toggleFavorite = (title: string): void => {
    favoritesService.toggleFavorite(title);
    setFavorites(favoritesService.getAllFavorites());
  };

  const favoriteTitles = favorites.map((fav) => fav.title);

  return {
    favorites,
    favoriteTitles,
    toggleFavorite,
  };
};

export default useFavorites;
