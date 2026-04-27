type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};
type LoginPayload = {
    email: string;
    password: string;
};
export declare const authService: {
    register: ({ name, email, password, role }: RegisterPayload) => Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            profile: import("mongoose").Types.ObjectId;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login: ({ email, password }: LoginPayload) => Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: "user" | "admin";
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: "user" | "admin";
        };
    }>;
    logout: (refreshToken: string) => Promise<void>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map