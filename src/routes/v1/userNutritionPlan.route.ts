import express from 'express';
import { userNutritionPlanController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
    .route('/')
    .post(auth(), userNutritionPlanController.createUserNutritionPlan);

router
    .route('/:userId/:date')
    .get(auth(), userNutritionPlanController.getUserNutritionPlanByUser);

router
    .route('/user/id/:userId')
    .get(auth(), userNutritionPlanController.getUserNutritionPlanDataByUserId);

router
    .route('/:userNutritionPlanId')
    .get(auth(), userNutritionPlanController.getUserNutritionPlan);

router
    .route('/:userNutritionPlanId/:date')
    .patch(auth(), userNutritionPlanController.updateUserNutritionPlan);

export default router;
