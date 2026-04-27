import mongoose, { Document } from 'mongoose';
export interface IScheduledMail extends Document {
    user: mongoose.Types.ObjectId;
    application: mongoose.Types.ObjectId;
    to: string;
    subject: string;
    body: string;
    resumeTemplateId: string;
    scheduledAt: Date;
    status: 'pending' | 'sent' | 'failed';
    error?: string;
}
declare const _default: mongoose.Model<IScheduledMail, {}, {}, {}, mongoose.Document<unknown, {}, IScheduledMail, {}, mongoose.DefaultSchemaOptions> & IScheduledMail & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IScheduledMail>;
export default _default;
//# sourceMappingURL=ScheduledMail.d.ts.map