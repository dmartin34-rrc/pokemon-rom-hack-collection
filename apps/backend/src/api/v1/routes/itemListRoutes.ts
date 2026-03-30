import { Router } from 'express';
import * as itemListController from '../controllers/itemListController';
import { validateRequest } from '../middleware/validate';
import {
  getItemListSchema,
  addItemListSchema,
  deleteItemListSchema,
  clearItemListSchema,
} from '../validation/itemListValidation';

const router = Router();

/**
 * @route GET /romdirectory
 * @description Get all ROMs.
 */
router.get(
  '/',
  validateRequest(getItemListSchema),
  itemListController.getItems,
);

/**
 * @route POST /romdirectory/:title
 * @description Add a ROM.
 */
router.post(
  '/roms',
  validateRequest(addItemListSchema),
  itemListController.addItem,
);

/**
 * @route DELETE /romdirectory/:title
 * @description Remove a ROM.
 */
router.delete(
  '/roms',
  validateRequest(deleteItemListSchema),
  itemListController.removeItem,
);

/**
 * @route DELETE /romdirectory
 * @description Remove ROMs.
 */
router.delete(
  '/',
  validateRequest(clearItemListSchema),
  itemListController.clearItems,
);

export default router;
