import mongoose from "mongoose";
import { BMIDocument, BMIModel } from "../interfaces/index.interface";
import { toJSON } from "./plugins/toJSON.plugin";
import { paginate } from "./plugins/paginate.plugin";

const bmiSchema = new mongoose.Schema<BMIDocument, BMIModel>(
    {
        age: { type: Number, required: true },
        ageCategory: { type: String, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        bmi: { type: Number, required: true },
        bmiCategory: { type: String, required: true },
        gender: { type: String, required: true },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', autopopulate: true }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
bmiSchema.plugin(toJSON);
bmiSchema.plugin(paginate);
bmiSchema.plugin(require('mongoose-autopopulate'));

export const BMI = mongoose.model<BMIDocument, BMIModel>('BMI', bmiSchema);