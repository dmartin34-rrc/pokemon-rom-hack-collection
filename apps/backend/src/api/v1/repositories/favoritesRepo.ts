import { PrismaClient } from '@prisma/client';
// types
import type Favorite from '../../../../../../shared/types/Favorite';

const prisma = new PrismaClient();

// Read
export const getFavorites = async (): Promise<Favorite[]> => {
  return await prisma.favorites.findMany();
};

// Create
export const addFavorite = async (romId: number): Promise<Favorite> => {
  return await prisma.favorites.create({
    data: {
      romId: romId,
    }
  });
};

// Delete
export const removeFavorite = async (romId: number): Promise<void> => {
  await prisma.favorites.deleteMany({
    where: {
      romId: romId,
    }
  });
};
