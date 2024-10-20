import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserDocument, UserModel } from '../interfaces/index.interface';
import { paginate, toJSON } from './plugins/index.plugin';
import { roles } from '../config/roles';

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    imgURL: {
      type: String,
      trim: true
    },
    imgPublicId: {
      type: String,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {string} excludeUserId - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email: string, excludedUserId: string): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludedUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user: any = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user: any = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
