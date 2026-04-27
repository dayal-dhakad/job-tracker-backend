import { AppError } from '../utils/AppError.js';
export const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    console.error(error);
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};
//# sourceMappingURL=error.middleware.js.map