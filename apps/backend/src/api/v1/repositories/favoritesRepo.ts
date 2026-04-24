import { PrismaClient } from '@prisma/client';
// types
import type Favorite from '../../../../../../shared/types/Favorite';

const prisma = new PrismaClient();

// Read
export const getFavorites = async (userId: number): Promise<Favorite[]> => {
  return await prisma.favorites.findMany({ where: { userId } });
};

// Create
export const addFavorite = async (
  romId: number,
  userId: number,
): Promise<Favorite> => {
  return await prisma.favorites.create({
    data: {
      romId,
      userId,
    },
  });
};

// Delete
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
