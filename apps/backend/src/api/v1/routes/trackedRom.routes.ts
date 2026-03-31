import { Router } from 'express';
import * as trackedRomController from '../controllers/trackedRom.controller';

const router = Router();

router.get('/', trackedRomController.getAllTrackedRoms);
router.post('/', trackedRomController.createTrackedRom);

export default router;