import { Favorites } from '@prisma/client';
import * as favoritesRepo from '../repositories/favoritesRepo';

// Fetch all the current Favorites from database
export const getAllFavorites = async (userId: number): Promise<Favorites[]> => {
  return await favoritesRepo.getFavorites(userId);
};

// Logic for adding or removing a favorite
export const toggleFavorite = async (
  romId: number,
  userId: number,
): Promise<Favorites | null> => {
  try {
    // Check if already a favorite
    const existingFavorite = await favoritesRepo.checkFavoriteExists(romId, userId);

    // Remove favorite if it already exists
    if (existingFavorite) {
      await favoritesRepo.removeFavorite(romId, userId);
      return null;
    }

    // Add to favorites if it doesn't exist
    const newFavorite = await favoritesRepo.addFavorite(romId, userId);
    return newFavorite;
    
  } catch (error) {
    throw new Error(`Failed to toggle favorite for romId ${romId}`);
  }
};
