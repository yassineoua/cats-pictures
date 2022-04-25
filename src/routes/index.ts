import { Router } from 'express';

import picturesRouter from './pictures';
import authRouter from './auth';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.use('/pictures', verifyToken, picturesRouter);
router.use('/auth', authRouter);

export default router;
