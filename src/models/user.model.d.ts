import { Types, type Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    role: 'user' | 'admin';
    isEmailVerified: boolean;
    profile?: Types.ObjectId | null;
    isActive: boolean;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map