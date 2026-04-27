import mongoose, { Document } from 'mongoose';
export interface IApplication extends Document {
    user: mongoose.Types.ObjectId;
    companyName: string;
    companyWebsite?: string;
    recruiterName?: string;
    recruiterEmail?: string;
    jobTitle: string;
    jobUrl?: string;
    location?: string;
    workMode: 'remote' | 'hybrid' | 'onsite' | 'unknown';
    source: 'linkedin' | 'naukri' | 'instahyre' | 'foundit' | 'company-website' | 'referral' | 'other';
    applicationType: 'cold-email' | 'direct-apply' | 'referral-request' | 'recruiter-outreach';
    status: 'draft' | 'ready' | 'sent' | 'replied' | 'interview' | 'rejected' | 'offer' | 'closed';
    priority: 'low' | 'medium' | 'high';
    resume?: mongoose.Types.ObjectId;
    template?: mongoose.Types.ObjectId;
    subject?: string;
    emailBody?: string;
    appliedAt?: Date;
    lastEmailSentAt?: Date;
    followUpDate?: Date;
    notes?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Application: mongoose.Model<IApplication, {}, {}, {}, mongoose.Document<unknown, {}, IApplication, {}, mongoose.DefaultSchemaOptions> & IApplication & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IApplication>;
//# sourceMappingURL=application.model.d.ts.map