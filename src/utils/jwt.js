import { env } from '../config/env.js';
import jwt from 'jsonwebtoken';
export const generateAccessToken = (payload) => {
    const options = {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};
export const generateRefreshToken = (payload) => {
    const options = {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
//# sourceMappingURL=jwt.js.map