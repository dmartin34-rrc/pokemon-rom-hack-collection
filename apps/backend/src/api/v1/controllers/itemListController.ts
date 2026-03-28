import { Request, Response, NextFunction } from 'express';
import * as itemListService from '../services/itemListService';
import { HTTP_STATUS } from 'src/constants/httpConstants';
import { successResponse } from '../models/responseModel';
import type { ItemList } from '../repositories/itemListRepo';

type Roms = ItemList['items'];

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page as string;

    const roms: Roms = await itemListService.getItems(page);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(roms, 'ROMs Retrieved'));
  } catch (err) {
    next(err);
  }
};

export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, title } = req.body as { page: string; title: string };

    const roms: Roms = await itemListService.addItem(page, title);

    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse<string[]>(roms, 'ROM Added'));
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, title } = req.body as { page: string; title: string };

    await itemListService.removeItem(page, title);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(undefined, 'ROM Removed'));
  } catch (err) {
    next(err);
  }
};

export const clearItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page as string;

    const roms: Roms = await itemListService.clearItems(page);

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse<string[]>(roms, 'ROMs Cleared'));
  } catch (err) {
    next(err);
  }
};
