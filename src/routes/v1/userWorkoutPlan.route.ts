import express from 'express';
import { userWorkoutPlanController } from '../../controllers/index.controller';

const router = express.Router();

router
  .route('/')
  .post(userWorkoutPlanController.createUserWorkoutPlan);

router
  .route('/:userId/:date')
  .get(userWorkoutPlanController.getUserWorkoutPlanByUser);

router
  .route('/user/id/:userId')
  .get(userWorkoutPlanController.getUserWorkoutPlanDataByUserId);

router
  .route('/:userWorkoutPlanId')
  .get(userWorkoutPlanController.getUserWorkoutPlan);

router
  .route('/:userWorkoutPlanId/:date')
  .patch(userWorkoutPlanController.updateUserWorkoutPlan);

export default router;
