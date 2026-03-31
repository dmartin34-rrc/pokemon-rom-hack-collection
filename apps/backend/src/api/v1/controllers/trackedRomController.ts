// trackedRomController.ts

import type { Request, Response } from 'express';
import { trackedRomService } from '../services/trackedRomService';

/**
 * Retrieves all tracked ROMs for a specific user.
 *
 * Expected query:
 * - userId: string
 *
 * Response:
 * - 200 with { isValid: true, data }
 * - 400 with { isValid: false, errorMessages }
 */
export const listTrackedRomsByUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = String(req.query.userId ?? '');

  if (!userId.trim()) {
    return res.status(400).json({
      isValid: false,
      errorMessages: ['userId is required.'],
    });
  }

  const trackedRoms = await trackedRomService.listByUser(userId);

  return res.json({
    isValid: true,
    data: trackedRoms,
  });
};

/**
 * Creates a new tracked ROM entry.
 *
 * Expected body:
 * - userId: string
 * - title: string
 * - hoursPlayed: number
 * - status: string
 *
 * Response:
 * - 201 with { isValid: true, data }
 * - 400 with { isValid: false, errorMessages }
 */
export const createTrackedRom = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const result = await trackedRomService.add(req.body);

  if (!result.isValid) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
};

/**
 * Updates an existing tracked ROM entry.
 *
 * Expected params:
 * - id: string
 *
 * Expected body:
 * - any updatable TrackedRom fields
 *
 * Response:
 * - 200 with { isValid: true, data }
 * - 400 with { isValid: false, errorMessages }
 */
export const updateTrackedRom = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = String(req.params.id ?? '');
  const result = await trackedRomService.update(id, req.body);

  if (!result.isValid) {
    return res.status(400).json(result);
  }

  return res.json(result);
};

/**
 * Deletes a tracked ROM entry by ID.
 *
 * Expected params:
 * - id: string
 *
 * Response:
 * - 200 with { isValid: true, data: { removed: true } }
 * - 400 with { isValid: false, errorMessages }
 */
export const deleteTrackedRom = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = String(req.params.id ?? '');
  const result = await trackedRomService.remove(id);

  if (!result.isValid) {
    return res.status(400).json(result);
  }

  return res.json(result);
};