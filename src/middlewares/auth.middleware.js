import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
export const protect = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized access', 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new AppError('Unauthorized access', 401));
    }
    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch {
        return next(new AppError('Invalid or expired access token', 401));
    }
};
//# sourceMappingURL=auth.middleware.js.map