import { Model, ObjectId } from "mongoose";

interface BMIDocument {
    id?: ObjectId,
    age: number,
    ageCategory: string,
    height: number,
    weight: number,
    bmi: number,
    bmiCategory: string,
    gender: string,
    user: ObjectId
}

interface BMIModel extends Model<BMIDocument> {
    toJson(scheme: any): void;
    paginate(filter: any, options: any): any;
}

export { BMIDocument, BMIModel };