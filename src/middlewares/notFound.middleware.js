export const notFoundMiddleware = (req, res, _next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
};
//# sourceMappingURL=notFound.middleware.js.map