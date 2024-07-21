import { Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import { bmiService, userNutritionPlanService, userWorkoutPlanService } from '../services/index.service';
import httpStatus from 'http-status';

const getDashboardData = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bmi = await bmiService.getBMIByUserId(req.params.userId as any);
    const userWorkoutPlan = await userWorkoutPlanService.getUserWorkoutPlanByUserId(req.params.userId as any);
    const userNutritionPlan = await userNutritionPlanService.getUserNutritionPlanByUserId(req.params.userId as any);

    const bmiData = bmi ? {
        age: bmi.age,
        height: bmi.height,
        weight: bmi.weight,
        bmi: bmi.bmi,
        bmiCategory: bmi.bmiCategory,
    } : null;

    if (!bmi) {
        res.status(httpStatus.OK).send({ bmiData: { warning: 'Please calculate BMI.' } });
        return;
    }

    const generatePlanData = (plan: any, planType: string) => {
        const planStart = plan.planStart;
        let showPlanDay = Math.floor((new Date().getTime() - planStart.getTime()) / (24 * 60 * 60 * 1000));
        if (showPlanDay < 0) showPlanDay = 0;
        const monthSection = Math.floor(showPlanDay / 10);
        const description = plan[`${planType}Plan`][`${planType}Days`][monthSection].description;

        return planType === 'nutrition'
            ? { dietDay: showPlanDay + 1, description }
            : { exerciseDay: showPlanDay + 1, description };
    };

    const userWorkoutPlanData = userWorkoutPlan ? generatePlanData(userWorkoutPlan, 'workout') : { warning: 'Please generate workout plan.' };
    const userNutritionPlanData = userNutritionPlan ? generatePlanData(userNutritionPlan, 'nutrition') : { warning: 'Please generate nutrition plan.' };

    res.status(httpStatus.OK).send({ bmiData, userWorkoutPlanData, userNutritionPlanData });
});

export { getDashboardData };