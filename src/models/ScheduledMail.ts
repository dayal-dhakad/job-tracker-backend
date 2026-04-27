// src/models/ScheduledMail.ts
import mongoose, { Schema, Document } from 'mongoose';

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

const scheduledMailSchema = new Schema<IScheduledMail>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<IScheduledMail>('ScheduledMail', scheduledMailSchema);
