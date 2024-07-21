import mongoose, { Schema } from 'mongoose';
import { NutritionPlanDocument, NutritionPlanModel } from '../interfaces/index.interface';
import { toJSON, paginate } from './plugins/index.plugin';

const nutritionPlanSchema = new mongoose.Schema<NutritionPlanDocument, NutritionPlanModel>(
    {
        ageCategory: { type: String, required: true },
        bmiCategory: { type: String, required: true },
        nutritionDays: [
            {
                description: { type: String, required: true },
                diet: [
                    {
                        t1: { type: String, default: "" },
                        t2: { type: String, default: "" },
                        t3: { type: String, default: "" },
                        m1: { type: String, default: "" },
                        m2: { type: String, default: "" },
                        m3: { type: String, default: "" },
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
nutritionPlanSchema.plugin(toJSON);
nutritionPlanSchema.plugin(paginate);

export const NutritionPlan = mongoose.model<NutritionPlanDocument, NutritionPlanModel>('NutritionPlan', nutritionPlanSchema);