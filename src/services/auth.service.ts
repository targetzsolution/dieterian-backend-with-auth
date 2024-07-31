import httpStatus from "http-status";
import { userService } from "./index.service";
import ApiError from "../utils/ApiError";
import { UserDocument } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import tokenTypes from "../config/tokens";

// Login with email and password
export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<UserDocument> => {
    const user: any = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
    }

    return user;
}

// Logout
export const logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.deleteOne();
};