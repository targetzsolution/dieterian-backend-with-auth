import mongoose, { Schema } from 'mongoose';
import { UserNutritionPlanDocument, UserNutritionPlanModel } from '../interfaces/index.interface';
import { paginate, toJSON } from './plugins/index.plugin';

const userNutritionPlanSchema = new mongoose.Schema<UserNutritionPlanDocument, UserNutritionPlanModel>(
    {
        name: { type: String, default: 'Body Blast' },
        planStart: { type: Date, required: true },
        planEnd: { type: Date, required: true },
        medicalCondition: { type: Boolean, default: false },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', autopopulate: true },
        nutritionPlan: {
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
                            c1: { type: Boolean },
                            c2: { type: Boolean },
                            c3: { type: Boolean },
                            locked: { type: Boolean, default: false }
                        }
                    ]
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
userNutritionPlanSchema.plugin(toJSON);
userNutritionPlanSchema.plugin(paginate);

export const UserNutritionPlan = mongoose.model<UserNutritionPlanDocument, UserNutritionPlanModel>('UserNutritionPlan', userNutritionPlanSchema);