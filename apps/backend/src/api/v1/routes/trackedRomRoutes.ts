// trackedRomRoutes.ts

import { Router } from 'express';
import {
  createTrackedRom,
  deleteTrackedRom,
  listTrackedRomsByUser,
  updateTrackedRom,
} from '../controllers/trackedRomController';

/**
 * trackedRomRoutes
 *
 * Defines API endpoints for tracked ROM resources.
 *
 * Routes:
 * - GET /       -> list tracked ROMs for a user
 * - POST /      -> create a tracked ROM
 * - PUT /:id    -> update a tracked ROM
 * - DELETE /:id -> delete a tracked ROM
 */
const trackedRomRoutes = Router();

/**
 * GET /
 * Retrieves tracked ROMs for a user.
 * Expects userId as a query parameter.
 */
trackedRomRoutes.get('/', listTrackedRomsByUser);

/**
 * POST /
 * Creates a new tracked ROM entry.
 */
trackedRomRoutes.post('/', createTrackedRom);

/**
 * PUT /:id
 * Updates an existing tracked ROM entry by ID.
 */
trackedRomRoutes.put('/:id', updateTrackedRom);

/**
 * DELETE /:id
 * Deletes an existing tracked ROM entry by ID.
 */
trackedRomRoutes.delete('/:id', deleteTrackedRom);

export default trackedRomRoutes;