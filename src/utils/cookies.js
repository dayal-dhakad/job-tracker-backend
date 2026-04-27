import { env } from '../config/env.js';
export const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.IS_PRODUCTION,
        sameSite: env.IS_PRODUCTION ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
export const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env.IS_PRODUCTION,
        sameSite: env.IS_PRODUCTION ? 'none' : 'lax',
    });
};
//# sourceMappingURL=cookies.js.map