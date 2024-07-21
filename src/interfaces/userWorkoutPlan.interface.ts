import { Model, ObjectId } from 'mongoose';
import { IExercise, IWorkoutDays } from './common.interface';

interface IUserExercise extends IExercise {
    c1?: string | number;
    c2?: string | number;
    c3?: string | number;
    locked: boolean;
}

interface IUserWorkoutDays extends IWorkoutDays {
    exercise: IUserExercise[];
}

interface IWorkoutPlan {
    ageCategory: string;
    bmiCategory: string;
    workoutDays: IUserWorkoutDays[];
}

interface UserWorkoutPlanDocument {
    id?: ObjectId;
    name?: string;
    planStart: Date;
    planEnd: Date;
    medicalCondition: boolean;
    workoutPlan: IWorkoutPlan;
    user: ObjectId;
}

interface UserWorkoutPlanModel extends Model<UserWorkoutPlanDocument> {
    toJSON(schema: any): void;
    paginate(filter: any, options: any): any;
}

export { UserWorkoutPlanDocument, UserWorkoutPlanModel };