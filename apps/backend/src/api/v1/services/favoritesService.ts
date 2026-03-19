import type Favorite from '../types/Favorite';
import * as favoritesRepo from '../repositories/favoritesRepo';

// Fetch all the current Favorites from repo
export const getAllFavorites = (): Favorite[] => {
  return favoritesRepo.getFavorites();
};

// Logic for adding or removing a favorite
export const toggleFavorite = (
  title: string,
  userId: string = 'test-user',
): void => {
  const currentFavorites = favoritesRepo.getFavorites();

  // Check if already a favorite
  const existingFavorite = currentFavorites.find(
    (fav) => fav.title === title && fav.userId === userId,
  );

  // Remove favorite if it already exists
  if (existingFavorite) {
    favoritesRepo.removeFavorite(existingFavorite.id);
    // Add to favorites if it doesn't exist
  } else {
    const newFav: Favorite = {
      id: `fav-${Date.now()}`,
      userId: userId,
      title: title,
      timeAdded: new Date().toISOString(),
    };

    favoritesRepo.addFavorite(newFav);
  }
};
