import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userNutritionPlanService } from '../services/index.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const createUserNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userNutritionPlan = await userNutritionPlanService.createUserNutritionPlan(req.body);
    res.status(httpStatus.CREATED).send(userNutritionPlan);
});

const getUserNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userNutritionPlan = await userNutritionPlanService.getUserNutritionPlanById(req.params.userNutritionPlanId as any);
    if (!userNutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User nutrition plan not found');
    }
    res.send(userNutritionPlan);
});

const getUserNutritionPlanDataByUserId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userNutritionPlan = await userNutritionPlanService.getUserNutritionPlanByUserId(req.params.userId as any);
    if (!userNutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User nutrition plan not found');
    }
    res.send(userNutritionPlan);
});

const getUserNutritionPlanByUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userNutritionPlan = await userNutritionPlanService.getUserNutritionPlanByUserId(req.params.userId as any);
    if (!userNutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User nutrition plan not found');
    }

    const planStart = userNutritionPlan.planStart.getTime();
    let showPlanDay = Math.floor((new Date(req.params.date as any).getTime() - planStart) / (24 * 60 * 60 * 1000));
    if (showPlanDay < 0) showPlanDay = 0;
    const monthSection = Math.floor(showPlanDay / 10);
    const monthSectionDay = showPlanDay % 10;

    const userNutritionPlanData = {
        id: userNutritionPlan.id,
        agecategory: userNutritionPlan.nutritionPlan.ageCategory,
        nutritionDays: {
            description: userNutritionPlan.nutritionPlan.nutritionDays[monthSection].description,
            exercise: userNutritionPlan.nutritionPlan.nutritionDays[monthSection].diet[monthSectionDay]
        }
    }

    res.send(userNutritionPlanData);
});

const updateUserNutritionPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userNutritionPlan = await userNutritionPlanService.updateUserNutritionPlanById(req.params.userNutritionPlanId as any, req.params.date as any, req.body);
    res.send(userNutritionPlan);
});

export { createUserNutritionPlan, getUserNutritionPlan, getUserNutritionPlanByUser, updateUserNutritionPlan, getUserNutritionPlanDataByUserId };