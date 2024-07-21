import { ObjectId } from "mongoose";
import { BMIDocument } from "../interfaces/bmi.interface";
import { BMI } from "../models/index.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const squareHeight = heightInMeters * heightInMeters;
    const BMI = Number((weight / squareHeight).toFixed(2));

    return BMI;
}

const bmiCategory = (bmi: number) => {
    if (bmi > 0 && bmi <= 18.5)
        return 'underweight';
    else if (bmi > 18.5 && bmi <= 24.9)
        return 'normal';
    else if (bmi > 24.9 && bmi <= 29.9)
        return 'overweight';
    else
        return 'obese';
}

const getAgeGroup = (age: number) => {
    if (age > 17 && age <= 30) 
        return 'youth';
    else if (age > 30 && age <= 50)
        return 'prime'
    else if (age > 50)
        return 'senior';
    else
        return 'minor';
}

// Create user bmi data
export const createBMI = async (bmiBody: { [k: string]: any }): Promise<BMIDocument> => {
    const bmi = await BMI.findOne({ user: bmiBody.user });
    if (bmi) {
        throw new ApiError(httpStatus.CONFLICT, 'BMI already exist');
    }
    const userBMI = calculateBMI(bmiBody.height, bmiBody.weight);
    const userBMICategory = bmiCategory(userBMI);
    const userAgeCategory = getAgeGroup(bmiBody.age);

    bmiBody.bmi = userBMI;
    bmiBody.bmiCategory = userBMICategory;
    bmiBody.ageCategory = userAgeCategory;

    return BMI.create(bmiBody);
}

/**
 * Query for contact
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

export const queryBMI = async (filter: object, option: object): Promise<BMIDocument[]> => {
    const bmi = await BMI.paginate(filter, option);
    return bmi;
};

// Get user bmi by id
export const getBMIById = async (id: ObjectId): Promise<BMIDocument | null> => {
    return BMI.findById(id);
};

// Get user bmi by user id
export const getBMIByUserId = async (user: { [k: string]: any }): Promise<BMIDocument | null> => {
    return BMI.findOne({ user });
};

// Update user bmi by id
export const updateBMIById = async (bmiId: ObjectId, updateBody: { [k: string]: any }): Promise<BMIDocument> => {
    const bmi = await getBMIById(bmiId);
    if (!bmi) {
        throw new ApiError(httpStatus.NOT_FOUND, 'BMI not found.')
    }

    const userBMI = calculateBMI(updateBody.height, updateBody.weight);
    const userBMICategory = bmiCategory(userBMI);
    updateBody.bmi = userBMI;
    updateBody.category = userBMICategory;

    Object.assign(bmi as any, updateBody as any);
    await (bmi as any).save();
    return bmi;
}

// Delete user bmi by id
export const deleteBMIById = async (bmiId: ObjectId): Promise<BMIDocument> => {
    const bmi = await BMI.findByIdAndDelete(bmiId);
    if (!bmi) {
        throw new ApiError(httpStatus.NOT_FOUND, 'BMI not found.');
    }

    return bmi;
}