import { Router } from 'express';
import {
  uploadPicture,
  deletePicture,
  getPicture,
  getAllPictures,
  updatePicture,
} from '../controllers/PictureController';

const router = Router();

router.post('/upload', uploadPicture);
router.put('/:id', updatePicture);
router.delete('/:id', deletePicture);
router.get('/:id', getPicture);
router.get('/', getAllPictures);

export default router;
