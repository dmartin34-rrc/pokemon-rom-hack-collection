import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { favoriteSchema } from "../validation/favoritesValidation";
import * as favoritesController from "../controllers/favoritesController";

/**
 * Routes determine which endpoints are made available, which controller
 * method to request if that route gets a corresponding request,
 * and invoke validation middleware if needed.
 */

const router: Router = express.Router();

// Fetch all favorites
router.get("/favorites", favoritesController.getFavorites);

// Toggle a favorite, invokes validateRequest middleware tested against favoriteSchema
router.post("/favorites", validateRequest(favoriteSchema), favoritesController.toggleFavorite);

export default router;