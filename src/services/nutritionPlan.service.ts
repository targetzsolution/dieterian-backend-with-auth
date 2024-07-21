import { ObjectId } from "mongoose";
import { NutritionPlanDocument } from "../interfaces/nutritionPlan.interface";
import { NutritionPlan } from "../models/nutritionPlan.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

// Create nutrition plan
export const createNutritionPlan = async (nutritionPlanBody: { [k: string]: any }): Promise<NutritionPlanDocument> => {
    const nutritionPlan = await NutritionPlan.findOne({ bmiCategory: nutritionPlanBody.bmiCategory, ageCategory: nutritionPlanBody.ageCategory });
    if (nutritionPlan) {
        throw new ApiError(httpStatus.CONFLICT, 'Nutrition plan already exist');
    }
    return NutritionPlan.create(nutritionPlanBody);
}

/**
 * Query for nutrition plans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryNutritionPlans = async (filter: object, options: object): Promise<NutritionPlanDocument[]> => {
    const nutritionPlans = await NutritionPlan.paginate(filter, options);
    return nutritionPlans;
};

// Get nutrition plan by id
export const getNutritionPlanById = async (id: ObjectId): Promise<NutritionPlanDocument | null> => {
    return NutritionPlan.findById(id);
};

// Update nutrition plan by id
export const updateNutritionPlanById = async (nutritionPlanId: ObjectId, updateBody: { [k: string]: any }): Promise<NutritionPlanDocument> => {
    const nutritionPlan = await getNutritionPlanById(nutritionPlanId);
    if (!nutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Nutrition plan not found');
    }

    Object.assign(nutritionPlan as any, updateBody as any);
    await (nutritionPlan as any).save();
    return nutritionPlan;
};

// Delete nutrition plan by id
export const deleteNutritionPlanById = async (nutritionPlanId: ObjectId): Promise<NutritionPlanDocument> => {
    const nutritionPlan = await getNutritionPlanById(nutritionPlanId);
    if (!nutritionPlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Nutrition plan not found');
    }
    await NutritionPlan.deleteOne({ _id: nutritionPlanId });
    return nutritionPlan;
};
