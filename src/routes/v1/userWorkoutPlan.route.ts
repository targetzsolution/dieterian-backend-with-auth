import express from 'express';
import { userWorkoutPlanController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(auth(), userWorkoutPlanController.createUserWorkoutPlan);

router
  .route('/:userId/:date')
  .get(userWorkoutPlanController.getUserWorkoutPlanByUser);

router
  .route('/byUser')
  .get(auth(), userWorkoutPlanController.getUserWorkoutPlanDataByUserId);

router
  .route('/:userWorkoutPlanId')
  .get(userWorkoutPlanController.getUserWorkoutPlan);

router
  .route('/:userWorkoutPlanId/:date')
  .patch(userWorkoutPlanController.updateUserWorkoutPlan);

export default router;
