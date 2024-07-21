import { Model, ObjectId } from 'mongoose';
import { IWorkoutDays } from './common.interface';

interface WorkoutPlanDocument {
    id?: ObjectId;
    ageCategory: string;
    bmiCategory: string;
    workoutDays: IWorkoutDays[];
}

interface WorkoutPlanModel extends Model<WorkoutPlanDocument> {
    toJSON(schema: any): void;
    paginate(filter: any, options: any): any;
}

export { WorkoutPlanDocument, WorkoutPlanModel };