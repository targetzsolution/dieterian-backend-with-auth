import mongoose, { Schema } from 'mongoose';
import { WorkoutPlanDocument, WorkoutPlanModel } from '../interfaces/index.interface';
import { toJSON, paginate } from './plugins/index.plugin';

const workoutPlanSchema = new mongoose.Schema<WorkoutPlanDocument, WorkoutPlanModel>(
    {
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
workoutPlanSchema.plugin(toJSON);
workoutPlanSchema.plugin(paginate);

export const WorkoutPlan = mongoose.model<WorkoutPlanDocument, WorkoutPlanModel>('WorkoutPlan', workoutPlanSchema);