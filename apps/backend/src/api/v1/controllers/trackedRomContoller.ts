import type { Request, Response } from 'express';
import * as trackedRomService from '../services/trackedRom.service';

export const getAllTrackedRoms = async (_req: Request, res: Response) => {
  const trackedRoms = await trackedRomService.getAllTrackedRoms();
  res.json(trackedRoms);
};

export const createTrackedRom = async (req: Request, res: Response) => {
  const trackedRom = await trackedRomService.createTrackedRom(req.body);
  res.status(201).json(trackedRom);
};