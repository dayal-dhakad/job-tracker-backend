import { Schema, Types } from 'mongoose';
declare const Profile: import("mongoose").Model<{
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {
    user: Types.ObjectId;
    skills: string[];
    experienceYears: number;
    phone?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    resumeUrl?: string | null;
    currentCompany?: string | null;
    currentDesignation?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default Profile;
//# sourceMappingURL=profile.model.d.ts.map