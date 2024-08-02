import { Model, ObjectId } from 'mongoose';

interface UserDocument {
  id?: ObjectId;
  userName: string;
  email: string;
  password: string;
  role: string;
  imgURL: string;
  imgPublicId: string;
}

interface UserModel extends Model<UserDocument> {
  isEmailTaken(email: string, excludedUserId?: ObjectId): boolean;
  toJson(schema: any): void;
  paginate(filter: any, options: any): any;
}

export { UserModel, UserDocument };
