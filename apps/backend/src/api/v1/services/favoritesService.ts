import { Favorites } from "@prisma/client";
import prisma from '../../../../prisma/client';

// Fetch all the current Favorites from database
export const getAllFavorites = async (): Promise<Favorites[]> => {
  return prisma.favorites.findMany();
};

// Logic for adding or removing a favorite
export const toggleFavorite = async (romId: number): Promise<Favorites | null> => {
  try {
    // Check if already a favorite
    const existingFavorite = await prisma.favorites.findUnique({
      where: { romId: romId }
    });
  
    // Remove favorite if it already exists
    if (existingFavorite) {
      await prisma.favorites.delete({
        where: { id: existingFavorite.id }
      });
      return null;
    } 

    // Add to favorites if it doesn't exist
    const newFavorite: Favorites = await prisma.favorites.create({
      data: { romId: romId }
    });

    return newFavorite;

  } catch(error) {
    throw new Error(`Failed to toggle favorite for romId ${romId}`);
  }
};
