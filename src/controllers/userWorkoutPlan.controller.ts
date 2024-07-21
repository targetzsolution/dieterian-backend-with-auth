import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userWorkoutPlanService } from '../services/index.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const createUserWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userWorkoutPlan = await userWorkoutPlanService.createUserWorkoutPlan(req.body);
    res.status(httpStatus.CREATED).send(userWorkoutPlan);
});

const getUserWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userWorkoutPlan = await userWorkoutPlanService.getUserWorkoutPlanById(req.params.userWorkoutPlanId as any);
    if (!userWorkoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User workout plan not found');
    }
    res.send(userWorkoutPlan);
});

const getUserWorkoutPlanByUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userWorkoutPlan = await userWorkoutPlanService.getUserWorkoutPlanByUserId(req.params.userId as any);
    if (!userWorkoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User workout plan not found');
    }

    const planStart = userWorkoutPlan.planStart.getTime();
    let showPlanDay = Math.floor((new Date(req.params.date as any).getTime() - planStart) / (24 * 60 * 60 * 1000));
    if (showPlanDay < 0) showPlanDay = 0;
    const monthSection = Math.floor(showPlanDay / 10);
    const monthSectionDay = showPlanDay % 10;

    const userWorkoutPlanData = {
        id: userWorkoutPlan.id,
        agecategory: userWorkoutPlan.workoutPlan.ageCategory,
        workoutDays: {
            description: userWorkoutPlan.workoutPlan.workoutDays[monthSection].description,
            exercise: userWorkoutPlan.workoutPlan.workoutDays[monthSection].exercise[monthSectionDay]
        }
    }

    res.send(userWorkoutPlanData);
});

const updateUserWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userWorkoutPlan = await userWorkoutPlanService.updateUserworkoutPlanById(req.params.userWorkoutPlanId as any, req.params.date as any, req.body);
    res.send(userWorkoutPlan);
});

export { createUserWorkoutPlan, getUserWorkoutPlan, getUserWorkoutPlanByUser, updateUserWorkoutPlan };