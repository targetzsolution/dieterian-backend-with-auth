import mongoose from "mongoose";
import { ContactDocument, ContactModel } from "../interfaces/contact.interface";
import validator from "validator";
import { toJSON } from "./plugins/toJSON.plugin";
import { paginate } from "./plugins/paginate.plugin";

const contactSchema = new mongoose.Schema<ContactDocument, ContactModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            }
        },
        telephone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        isMember: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: 'open'
        }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

export const Contact = mongoose.model<ContactDocument, ContactModel>('Contact', contactSchema);