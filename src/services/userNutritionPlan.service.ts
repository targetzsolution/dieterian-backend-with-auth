import { ObjectId } from "mongoose";
import { UserNutritionPlanDocument } from "../interfaces/userNutritionPlan.interface";
import { UserNutritionPlan } from "../models/userNutritionPlan.model";
import { NutritionPlan } from "../models/nutritionPlan.model";
import { BMI } from "../models/bmi.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

// Create a user nutrition plan
export const createUserNutritionPlan = async (userNutritionPlanBody: { [k: string]: any }): Promise<UserNutritionPlanDocument> => {
    const userNutritionPlan = await UserNutritionPlan.findOne({ user: userNutritionPlanBody.user });
    if (userNutritionPlan) {
        throw new ApiError(httpStatus.CONFLICT, 'User nutrition plan already exist');
    }

    const bmi = await BMI.findOne({ user: userNutritionPlanBody.user });
    if (!bmi)
        throw new ApiError(httpStatus.NOT_FOUND, 'User BMI not found');
    else if (bmi.ageCategory === 'minor')
        throw new ApiError(httpStatus.UNAUTHORIZED, 'No plan for underage person');

    const nutritionPlan = await NutritionPlan.findOne({ bmiCategory: bmi.bmiCategory, ageCategory: bmi.ageCategory });
    if (!nutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Nutrition plan not found');
    }
    userNutritionPlanBody.nutritionPlan = nutritionPlan;

    // Plan start date
    const now = new Date();
    const planStartDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    userNutritionPlanBody.planStart = planStartDate;

    // Plan end date
    const planEndDate = new Date(planStartDate);
    planEndDate.setUTCDate(planEndDate.getUTCDate() + 29);
    userNutritionPlanBody.planEnd = planEndDate;


    return UserNutritionPlan.create(userNutritionPlanBody);
}

// Get nutrition plan by id
export const getUserNutritionPlanById = async (id: ObjectId): Promise<UserNutritionPlanDocument | null> => {
    return UserNutritionPlan.findById(id);
};

// Get nutrition plan by user id
export const getUserNutritionPlanByUserId = async (user: { [k: string]: any }): Promise<UserNutritionPlanDocument | null> => {
    return UserNutritionPlan.findOne({ user, planActive: true });
};

// Update user nutrition plan by id
export const updateUserNutritionPlanById = async (id: ObjectId, date: Date, updateBody: { [k: string]: any }): Promise<UserNutritionPlanDocument> => {
    const userNutritionPlan = await getUserNutritionPlanById(id);
    if (!userNutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User nutrition plan not found.');
    }

    // Calculate day of month
    const planStart = userNutritionPlan.planStart.getTime();
    const planDay = Math.floor((new Date(date).getTime() - planStart) / (24 * 60 * 60 * 1000));

    const monthSection = Math.floor(planDay / 10);
    const monthSectionDay = planDay % 10;

    Object.assign(userNutritionPlan.nutritionPlan.nutritionDays[monthSection].diet[monthSectionDay] as any, updateBody as any);
    await (userNutritionPlan as any).save();
    // userNutritionPlan.nutritionPlan.nutritionDays[monthSection].diet[planDay] = updateBody as any;

    return userNutritionPlan;
}

export const deActivateUserNutritionPlan = async (id: ObjectId) => {
    const userNutritionPlan = await getUserNutritionPlanByUserId(id);
    if (!userNutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User nutrition plan not found.');
    }

    userNutritionPlan.planActive = false;

    await (userNutritionPlan as any).save();
}