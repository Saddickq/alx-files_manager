import express from 'express';
import appController from '../controllers/AppController';

const router = express.Router();

router.get('/status', appController.getStatus);
router.get('/stats', appController.getStats);

export default router;
