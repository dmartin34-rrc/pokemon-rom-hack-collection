import { Request, Response, NextFunction } from "express";
import * as favoritesService from "../services/favoritesService";
import { successResponse } from "../models/responseModel";

/**
 * Controller methods determine how to handle requests and respond to requests.
 * It sends the appropriate components of the request to services (if needed)
 * and responds to the request with an appropriate code/body.
 */

export const getFavorites = async(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try{
    const favorites = await favoritesService.getAllFavorites();
    res.status(200).json(
      successResponse(favorites, "Favorites retrieved successfully")
    );
  } catch (error) {
    // errorHandler middleware will always be the last to catch error throws
    next(error);
  }
};

export const toggleFavorite = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const romId = req.body.romId;

    const result = await favoritesService.toggleFavorite(romId);

    if (result === null) {
      // removed
      res.status(200).json(
        successResponse(null, "Favorite removed successfully")
      );
    } else {
      // added
      res.status(201).json(
        successResponse(result, "Favorite added successfully")
      );
    }
  } catch (error) {
    next(error);
  }
}