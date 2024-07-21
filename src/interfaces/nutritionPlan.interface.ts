import { Model, ObjectId } from 'mongoose';
import { INutritionDays } from './common.interface';

interface NutritionPlanDocument {
    id?: ObjectId;
    ageCategory: string;
    bmiCategory: string;
    nutritionDays: INutritionDays[];
}

interface NutritionPlanModel extends Model<NutritionPlanDocument> {
    toJSON(schema: any): void;
    paginate(filter: any, options: any): any;
}

export { NutritionPlanDocument, NutritionPlanModel };