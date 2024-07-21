import express from 'express';
import { dashboardController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/:userId')
  .get(auth(), dashboardController.getDashboardData);

export default router;