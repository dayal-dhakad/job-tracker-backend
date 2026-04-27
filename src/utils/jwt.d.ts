type JwtPayloadType = {
    userId: string;
    email: string;
    role: string;
};
export declare const generateAccessToken: (payload: JwtPayloadType) => string;
export declare const generateRefreshToken: (payload: JwtPayloadType) => string;
export declare const verifyAccessToken: (token: string) => JwtPayloadType;
export declare const verifyRefreshToken: (token: string) => JwtPayloadType;
export {};
//# sourceMappingURL=jwt.d.ts.map