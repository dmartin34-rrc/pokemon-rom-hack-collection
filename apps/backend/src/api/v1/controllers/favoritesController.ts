import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';
import * as favoritesService from '../services/favoritesService';
import * as userRepository from '../repositories/userRepo';
import { successResponse } from '../models/responseModel';
import { AuthenticationError } from '../errors/errors';

/**
 * Controller methods determine how to handle requests and respond to requests.
 * It sends the appropriate components of the request to services (if needed)
 * and responds to the request with an appropriate code/body.
 */

export const getFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Get userId from Clerk token
    const { userId: clerkId } = getAuth(req);

    // Check that Clerk token exists
    if (!clerkId) {
      throw new AuthenticationError('User not authenticated');
    }

    let dbUserId = await userRepository.findUserIdByClerkId(clerkId);

    // Check that user exists in our database
    if (!dbUserId) {
      dbUserId = await userRepository.createUser(clerkId);
    }
    const favorites = await favoritesService.getAllFavorites(dbUserId);
    res
      .status(200)
      .json(successResponse(favorites, 'Favorites retrieved successfully'));
  } catch (error) {
    // errorHandler middleware will always be the last to catch error throws
    next(error);
  }
};

export const toggleFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const romId = req.body.romId;
    
    const { userId: clerkId } = getAuth(req);
    
    if (!clerkId) {
      throw new AuthenticationError('User not authenticated');
    }

    let dbUserId = await userRepository.findUserIdByClerkId(clerkId);

    if (!dbUserId) {
      throw new AuthenticationError('User not found');
    }

    const result = await favoritesService.toggleFavorite(romId, dbUserId);

    if (result === null) {
      // removed
      res
        .status(200)
        .json(successResponse(null, 'Favorite removed successfully'));
    } else {
      // added
      res
        .status(201)
        .json(successResponse(result, 'Favorite added successfully'));
    }
  } catch (error) {
    next(error);
  }
};
