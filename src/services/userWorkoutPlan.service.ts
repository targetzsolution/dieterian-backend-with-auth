import { ObjectId } from "mongoose";
import { UserWorkoutPlanDocument } from "../interfaces/userWorkoutPlan.interface";
import { UserWorkoutPlan } from "../models/userWorkoutPlan.model";
import { WorkoutPlan } from "../models/workoutPlan.model";
import { BMI } from "../models/bmi.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

// Create a user workout plan
export const createUserWorkoutPlan = async (userWorkoutPlanBody: { [k: string]: any }): Promise<UserWorkoutPlanDocument> => {
    const userWorkoutPlan = await UserWorkoutPlan.findOne({ user: userWorkoutPlanBody.user });
    if (userWorkoutPlan) {
        throw new ApiError(httpStatus.CONFLICT, 'User workout plan already exist');
    }

    const bmi = await BMI.findOne({ user: userWorkoutPlanBody.user });
    if (!bmi)
        throw new ApiError(httpStatus.NOT_FOUND, 'User BMI not found');
    else if (bmi.ageCategory === 'minor')
        throw new ApiError(httpStatus.UNAUTHORIZED, 'No plan for underage person');

    const workoutPlan = await WorkoutPlan.findOne({ bmiCategory: bmi.bmiCategory, ageCategory: bmi.ageCategory });
    if (!workoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout plan not found');
    }
    userWorkoutPlanBody.workoutPlan = workoutPlan;

    // Plan start date
    const now = new Date();
    const planStartDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    userWorkoutPlanBody.planStart = planStartDate;

    // Plan end date
    const planEndDate = new Date(planStartDate);
    planEndDate.setUTCDate(planEndDate.getUTCDate() + 29);
    userWorkoutPlanBody.planEnd = planEndDate;

    return UserWorkoutPlan.create(userWorkoutPlanBody);
}

// Get workout plan by id
export const getUserWorkoutPlanById = async (id: ObjectId): Promise<UserWorkoutPlanDocument | null> => {
    return UserWorkoutPlan.findById(id);
};

// Get workout plan by id
export const getUserWorkoutPlanByUserId = async (user: { [k: string]: any }): Promise<UserWorkoutPlanDocument | null> => {
    return UserWorkoutPlan.findOne({ user, planActive: true });
};

// Update user workout plan by id
export const updateUserworkoutPlanById = async (id: ObjectId, date: Date, updateBody: { [k: string]: any }): Promise<UserWorkoutPlanDocument> => {
    const userWorkoutPlan = await getUserWorkoutPlanById(id);
    if (!userWorkoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User workout plan not found.');
    }

    // Calculate day of month
    const planStart = userWorkoutPlan.planStart.getTime();
    const planDay = Math.floor((new Date(date).getTime() - planStart) / (24 * 60 * 60 * 1000));

    const monthSection = Math.floor(planDay / 10);
    const monthSectionDay = planDay % 10;

    Object.assign(userWorkoutPlan.workoutPlan.workoutDays[monthSection].exercise[monthSectionDay] as any, updateBody as any);
    await (userWorkoutPlan as any).save();
    // userWorkoutPlan.workoutPlan.workoutDays[monthSection].exercise[planDay] = updateBody as any;

    return userWorkoutPlan;
}