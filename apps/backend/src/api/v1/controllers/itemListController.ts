import { Request, Response, NextFunction } from 'express';
import * as itemListService from '../services/itemListService';
import { HTTP_STATUS } from '../../../constants/httpConstants';
import { successResponse } from '../models/responseModel';
import type { ItemList } from '../repositories/itemListRepo';
import { getAuth } from '@clerk/express';
import * as userRepo from '../repositories/userRepo';
import { AuthenticationError } from '../errors/errors';

type Roms = ItemList['items'];

// just a helper function
const authenticateUserId = async (req: Request): Promise<number> => {
  const { userId: clerkId } = getAuth(req);

  if (!clerkId) {
    throw new AuthenticationError('User not authenticated');
  }

  let dbUserId = await userRepo.findUserIdByClerkId(clerkId);

  if (!dbUserId) {
    dbUserId = await userRepo.createUser(clerkId);
  }

  return dbUserId;
};

/**
 * @description Get all ROMs.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page as string;

    const userId = await authenticateUserId(req);

    const roms: Roms = await itemListService.getItems(page, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(roms, 'ROMs Retrieved'));
  } catch (err) {
    next(err);
  }
};

/**
 * @description Add a ROM.
 * @route POST /roms
 * @returns {Promise<void>}
 */
export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, title } = req.body as { page: string; title: string };

    const userId = await authenticateUserId(req);

    const roms: Roms = await itemListService.addItem(page, title, userId);

    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse<string[]>(roms, 'ROM Added'));
  } catch (err) {
    next(err);
  }
};

/**
 * @description Remove a ROM.
 * @route DELETE /roms
 * @returns {Promise<void>}
 */
export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, title } = req.body as { page: string; title: string };

    const userId = await authenticateUserId(req);

    const roms = await itemListService.removeItem(page, title, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(roms, 'ROM Removed'));
  } catch (err) {
    next(err);
  }
};

/**
 * @description Clear ROMs.
 * @route DELETE /
 * @returns {Promise<void>}
 */
export const clearItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page as string;

    const userId = await authenticateUserId(req);

    const roms: Roms = await itemListService.clearItems(page, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(roms, 'ROMs Cleared'));
  } catch (err) {
    next(err);
  }
};
