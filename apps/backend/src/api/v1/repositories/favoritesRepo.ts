import { Favorites } from '@prisma/client';
import prisma from '../../../../prisma/client';

// Fetch all favorites for a specific user
export const getFavorites = async (userId: number): Promise<Favorites[]> => {
  return await prisma.favorites.findMany({ where: { userId } });
};

// Check if a specific favorite exists for a user
export const checkFavoriteExists = async (
  romId: number,
  userId: number,
): Promise<Favorites | null> => {
  return await prisma.favorites.findFirst({
    where: { romId, userId },
  });
};

// Create a new favorite
export const addFavorite = async (
  romId: number,
  userId: number,
): Promise<Favorites> => {
  return await prisma.favorites.create({
    data: {
      romId,
      userId,
    },
  });
};

// Delete existing favorite
export const removeFavorite = async (
  romId: number,
  userId: number,
): Promise<void> => {
  await prisma.favorites.deleteMany({
    where: {
      romId,
      userId,
    },
  });
};
