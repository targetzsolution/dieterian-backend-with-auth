import mongoose, { Schema } from 'mongoose';
import { UserWorkoutPlanDocument, UserWorkoutPlanModel } from '../interfaces/index.interface';
import { paginate, toJSON } from './plugins/index.plugin';

const userWorkoutPlanSchema = new mongoose.Schema<UserWorkoutPlanDocument, UserWorkoutPlanModel>(
    {
        name: { type: String, default: 'Body Blast' },
        planStart: { type: Date, required: true },
        planEnd: { type: Date, required: true },
        medicalCondition: { type: Boolean, default: false },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', autopopulate: true },
        workoutPlan: {
            ageCategory: { type: String, required: true },
            bmiCategory: { type: String, required: true },
            workoutDays: [
                {
                    description: { type: String, required: true },
                    exercise: [
                        {
                            e1: { type: String, default: "" },
                            e2: { type: String, default: "" },
                            e3: { type: String, default: "" },
                            v1: { type: Schema.Types.Mixed, required: true },
                            v2: { type: Schema.Types.Mixed, required: true },
                            v3: { type: Schema.Types.Mixed, required: true },
                            d1: { type: String, default: "" },
                            d2: { type: String, default: "" },
                            d3: { type: String, default: "" },
                            c1: { type: Schema.Types.Mixed },
                            c2: { type: Schema.Types.Mixed },
                            c3: { type: Schema.Types.Mixed },
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
userWorkoutPlanSchema.plugin(toJSON);
userWorkoutPlanSchema.plugin(paginate);

export const UserWorkoutPlan = mongoose.model<UserWorkoutPlanDocument, UserWorkoutPlanModel>('UserWorkoutPlan', userWorkoutPlanSchema);