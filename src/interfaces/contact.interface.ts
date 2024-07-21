import { Model, ObjectId } from "mongoose";

interface ContactDocument {
    id?: ObjectId
    name: string,
    email: string,
    telephone: string,
    message: string,
    isMember: Boolean, 
    status: string
}

interface ContactModel extends Model<ContactDocument> {
    toJson(schema: any): void;
    paginate(filter: any, options: any): any
}

export { ContactDocument, ContactModel };