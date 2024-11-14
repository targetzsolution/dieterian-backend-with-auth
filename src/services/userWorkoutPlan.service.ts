import { ObjectId } from "mongoose";
import { UserWorkoutPlanDocument } from "../interfaces/userWorkoutPlan.interface";
import { UserWorkoutPlan } from "../models/userWorkoutPlan.model";
import { WorkoutPlan } from "../models/workoutPlan.model";
import { BMI } from "../models/bmi.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import moment from "moment";

// Create a user workout plan
export const createUserWorkoutPlan = async (userWorkoutPlanBody: { [k: string]: any }): Promise<UserWorkoutPlanDocument> => {
    const userWorkoutPlan = await UserWorkoutPlan.findOne({ user: userWorkoutPlanBody.user, planActive: true });
    if (userWorkoutPlan) {
        throw new ApiError(httpStatus.CONFLICT, 'User workout plan already exist');
    }

    const bmi = await BMI.findOne({ user: userWorkoutPlanBody.user });
    if (!bmi)
        throw new ApiError(httpStatus.NOT_FOUND, 'User BMI not found');
    else if (bmi.ageCategory === 'minor')
        throw new ApiError(httpStatus.NOT_FOUND, 'No plan for underage person');

    const workoutPlan = await WorkoutPlan.findOne({ bmiCategory: bmi.bmiCategory, ageCategory: bmi.ageCategory });
    if (!workoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout plan not found');
    }
    userWorkoutPlanBody.workoutPlan = workoutPlan;

    // Plan start date
    const planStartDate = moment().format('YYYY-MM-DD');
    userWorkoutPlanBody.planStart = planStartDate;

    // Plan end date
    const planEndDate = moment().add(29, 'days').format('YYYY-MM-DD');
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
    const planStart = moment(userWorkoutPlan.planStart).startOf('day');
    const planDay = moment(date).diff(planStart, 'days');

    const monthSection = Math.floor(planDay / 10);
    const monthSectionDay = planDay % 10;

    Object.assign(userWorkoutPlan.workoutPlan.workoutDays[monthSection].exercise[monthSectionDay] as any, updateBody as any);
    await (userWorkoutPlan as any).save();
    // userWorkoutPlan.workoutPlan.workoutDays[monthSection].exercise[planDay] = updateBody as any;

    return userWorkoutPlan;
}

export const deActivateUserWorkoutPlan = async (id: ObjectId) => {
    const userWorkoutPlan = await getUserWorkoutPlanByUserId(id);
    if (!userWorkoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User workout plan not found.');
    }

    userWorkoutPlan.planActive = false;

    await (userWorkoutPlan as any).save();
}