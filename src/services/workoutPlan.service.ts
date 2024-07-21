import { ObjectId } from "mongoose";
import { WorkoutPlanDocument } from "../interfaces/workoutPlan.interface";
import { WorkoutPlan } from "../models/workoutPlan.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

// Create workout plan
export const createWorkoutPlan = async (workoutPlanBody: { [k: string]: any }): Promise<WorkoutPlanDocument> => {
    const workoutPlan = await WorkoutPlan.findOne({ bmiCategory: workoutPlanBody.bmiCategory, ageCategory: workoutPlanBody.ageCategory});
    if (workoutPlan) {
        throw new ApiError(httpStatus.CONFLICT, 'Workout plan already exist');
    }
    return WorkoutPlan.create(workoutPlanBody);
}

/**
 * Query for workout plans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryWorkoutPlans = async (filter: object, options: object): Promise<WorkoutPlanDocument[]> => {
    const workoutPlans = await WorkoutPlan.paginate(filter, options);
    return workoutPlans;
};

// Get workout plan by id
export const getWorkoutPlanById = async (id: ObjectId): Promise<WorkoutPlanDocument | null> => {
    return WorkoutPlan.findById(id);
};

// Update workout plan by id
export const updateWorkoutPlanById = async (workoutPlanId: ObjectId, updateBody: { [k: string]: any }): Promise<WorkoutPlanDocument> => {
    const workoutPlan = await getWorkoutPlanById(workoutPlanId);
    if (!workoutPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout plan not found');
    }

    Object.assign(workoutPlan as any, updateBody as any);
    await (workoutPlan as any).save();
    return workoutPlan;
};

// Delete workout plan by id
export const deleteWorkoutPlanById = async (workoutPlanId: ObjectId): Promise<WorkoutPlanDocument> => {
    const workoutPlan = await getWorkoutPlanById(workoutPlanId);
    if (!workoutPlan) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Workout plan not found');
    }
    await WorkoutPlan.deleteOne({ _id: workoutPlanId });
    return workoutPlan;
  };
  