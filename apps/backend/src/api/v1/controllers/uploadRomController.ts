import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../../constants/httpConstants';
import { createRom, listSeededRoms } from '../services/uploadRomService';
import { errorResponse, successResponse } from '../models/responseModel';

const isValid = (value: any): boolean => {
  return value === true;
};

const parseTags = (tags: any): string[] => {
  if (Array.isArray(tags)) {
    return tags.map(String);
  }

  if (typeof tags !== 'string') {
    return [];
  }

  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

export const uploadRom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const files = (req.files as Express.Multer.File[]) ?? [];

    const createdRom = await createRom({
      title: req.body.title,
      description: req.body.description,
      tags: parseTags(req.body.tags),
      year: req.body.year,
      completed: isValid(req.body.completed),
      multiplayer: isValid(req.body.multiplayer),
      imagePaths: files.map((file) => `/uploads/${file.filename}`),
    });

    if (!createdRom.isValid) {
      res.status(HTTP_STATUS.BAD_REQUEST);
      return;
    }

    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse(createdRom.data, 'ROM uploaded successfully'));
  } catch (err) {
    next(err);
  }
};

export const getSeedRoms = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const roms = await listSeededRoms();
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(roms, 'ROM catalog retrieved'));
  } catch (err) {
    next(err);
  }
};
