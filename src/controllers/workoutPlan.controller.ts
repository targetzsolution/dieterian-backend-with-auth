import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { workoutPlanService } from '../services/index.service';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';

const createWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const workoutPlan = await workoutPlanService.createWorkoutPlan(req.body);
    res.status(httpStatus.CREATED).send(workoutPlan);
});

const getWorkoutPlans = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await workoutPlanService.queryWorkoutPlans(filter, options);
    res.send(result);
});

const getWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const workoutPlan = await workoutPlanService.getWorkoutPlanById(req.params.workoutPlanId as any);
    if (!workoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout plan not found');
    }
    res.send(workoutPlan);
});

const updateWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const workoutPlan = await workoutPlanService.updateWorkoutPlanById(req.params.workoutPlanId as any, req.body);
    res.send(workoutPlan);
});

const deleteWorkoutPlan = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await workoutPlanService.deleteWorkoutPlanById(req.params.workoutPlanId as any);
    res.status(httpStatus.NO_CONTENT).send();
});

export { createWorkoutPlan, getWorkoutPlans, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan };