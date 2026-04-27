import dotenv from 'dotenv';
dotenv.config();
const requiredEnvVars = [
    'PORT',
    'MONGO_URI',
    'NODE_ENV',
    'CLIENT_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'ACCESS_TOKEN_EXPIRES_IN',
    'REFRESH_TOKEN_EXPIRES_IN',
];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});
export const env = {
    PORT: Number(process.env.PORT),
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
//# sourceMappingURL=env.js.map