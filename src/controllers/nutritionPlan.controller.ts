import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { nutritionPlanService } from '../services/index.service';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';

const createNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const nutritionPlan = await nutritionPlanService.createNutritionPlan(req.body);
    res.status(httpStatus.CREATED).send(nutritionPlan);
});

const getNutritionPlans = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await nutritionPlanService.queryNutritionPlans(filter, options);
    res.send(result);
});

const getNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const nutritionPlan = await nutritionPlanService.getNutritionPlanById(req.params.nutritionPlanId as any);
    if (!nutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Nutrition plan not found');
    }
    res.send(nutritionPlan);
});

const updateNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const nutritionPlan = await nutritionPlanService.updateNutritionPlanById(req.params.nutritionPlanId as any, req.body);
    res.send(nutritionPlan);
});

const deleteNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await nutritionPlanService.deleteNutritionPlanById(req.params.nutritionPlanId as any);
    res.status(httpStatus.NO_CONTENT).send();
});

export { createNutritionPlan, getNutritionPlans, getNutritionPlan, updateNutritionPlan, deleteNutritionPlan };