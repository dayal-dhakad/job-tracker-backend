// src/models/ScheduledMail.ts
import mongoose, { Schema, Document } from 'mongoose';
const scheduledMailSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    application: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    resumeTemplateId: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending',
    },
    error: String,
}, { timestamps: true });
export default mongoose.model('ScheduledMail', scheduledMailSchema);
//# sourceMappingURL=ScheduledMail.js.map