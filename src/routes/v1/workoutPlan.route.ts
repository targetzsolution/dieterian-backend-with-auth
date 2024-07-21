import express from 'express';
import { workoutPlanController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(auth(), workoutPlanController.createWorkoutPlan)
  .get(auth(), workoutPlanController.getWorkoutPlans);

router
  .route('/:workoutPlanId')
  .get(auth(), workoutPlanController.getWorkoutPlan)
  .patch(auth(), workoutPlanController.updateWorkoutPlan)
  .delete(auth(), workoutPlanController.deleteWorkoutPlan);

export default router;