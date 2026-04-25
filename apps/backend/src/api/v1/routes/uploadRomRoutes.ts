import { Router } from 'express';
import upload from '../middleware/upload';
import { getSeedRoms, uploadRom } from '../controllers/uploadRomController';

const router = Router();

router.get('/', getSeedRoms);

router.post('/', upload.array('images', 10), uploadRom);

export default router;
