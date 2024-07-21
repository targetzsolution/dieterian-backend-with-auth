import { Model, ObjectId } from 'mongoose';
import { IDiet, INutritionDays } from './common.interface';

interface IUserDiet extends IDiet {
    c1: boolean;
    c2: boolean;
    c3: boolean;
    locked: boolean;
}

interface IUserNutritionDays extends INutritionDays {
    diet: IUserDiet[];
}

interface INutritionPlan {
    ageCategory: string;
    bmiCategory: string;
    nutritionDays: IUserNutritionDays[];
}

interface UserNutritionPlanDocument {
    id?: ObjectId;
    name?: string;
    planStart: Date;
    planEnd: Date;
    medicalCondition: boolean;
    nutritionPlan: INutritionPlan;
    user: ObjectId;
}

interface UserNutritionPlanModel extends Model<UserNutritionPlanDocument> {
    toJSON(schema: any): void;
    paginate(filter: any, options: any): any;
}

export { UserNutritionPlanDocument, UserNutritionPlanModel };