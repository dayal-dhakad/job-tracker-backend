import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { AppError } from '../utils/AppError.js';
import Profile from '../models/profile.model.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
export const authService = {
    register: async ({ name, email, password, role }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('User already exists', 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role,
        });
        const profile = await Profile.create({
            user: user._id,
        });
        const tokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        user.refreshToken = refreshToken;
        await user.save();
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: profile._id,
            },
            accessToken,
            refreshToken,
        };
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new AppError('Invalid email or password', 401);
        }
        const tokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        user.refreshToken = refreshToken;
        await user.save();
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        };
    },
    refreshAccessToken: async (refreshToken) => {
        if (!refreshToken) {
            throw new AppError('Refresh token is required', 401);
        }
        let decoded;
        try {
            decoded = verifyRefreshToken(refreshToken);
        }
        catch {
            throw new AppError('Invalid or expired refresh token', 401);
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        if (!user.refreshToken || user.refreshToken !== refreshToken) {
            throw new AppError('Refresh token mismatch', 401);
        }
        const tokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        const newAccessToken = generateAccessToken(tokenPayload);
        const newRefreshToken = generateRefreshToken(tokenPayload);
        user.refreshToken = newRefreshToken;
        await user.save();
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
    logout: async (refreshToken) => {
        if (!refreshToken) {
            return;
        }
        let decoded;
        try {
            decoded = verifyRefreshToken(refreshToken);
        }
        catch {
            return;
        }
        const user = await User.findById(decoded.userId);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
    },
};
//# sourceMappingURL=auth.service.js.map