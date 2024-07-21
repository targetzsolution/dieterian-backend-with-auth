import express from 'express';
import { nutritionPlanController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
    .route('/')
    .post(auth(), nutritionPlanController.createNutritionPlan)
    .get(auth(), nutritionPlanController.getNutritionPlans);

router
    .route('/:nutritionPlanId')
    .get(auth(), nutritionPlanController.getNutritionPlan)
    .patch(auth(), nutritionPlanController.updateNutritionPlan)
    .delete(auth(), nutritionPlanController.deleteNutritionPlan);

export default router;