// data
import favoriteData from '../data/favoriteData.json';
// types
import type Favorite from '../types/Favorite';

let mockFavoritesDB: Favorite[] = [...favoriteData];

// Read
export const getFavorites = (): Favorite[] => {
    return [...mockFavoritesDB];
};

// Create
export const addFavorite = (newFav: Favorite): Favorite => {
    mockFavoritesDB = [...mockFavoritesDB, newFav];

    return newFav;
};

// Delete
export const removeFavorite = (id: string): void => {
    mockFavoritesDB = mockFavoritesDB.filter((fav) => fav.id !== id);
};