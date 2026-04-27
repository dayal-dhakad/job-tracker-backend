import mongoose, { Schema, Document } from 'mongoose';
const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyWebsite: {
        type: String,
        trim: true,
    },
    recruiterName: {
        type: String,
        trim: true,
    },
    recruiterEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobUrl: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    workMode: {
        type: String,
        enum: ['remote', 'hybrid', 'onsite', 'unknown'],
        default: 'unknown',
    },
    source: {
        type: String,
        enum: ['linkedin', 'naukri', 'instahyre', 'foundit', 'company-website', 'referral', 'other'],
        default: 'other',
    },
    applicationType: {
        type: String,
        enum: ['cold-email', 'direct-apply', 'referral-request', 'recruiter-outreach'],
        default: 'cold-email',
    },
    status: {
        type: String,
        enum: ['draft', 'ready', 'sent', 'replied', 'interview', 'rejected', 'offer', 'closed'],
        default: 'draft',
        index: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    resume: {
        type: Schema.Types.ObjectId,
        ref: 'Resume',
    },
    template: {
        type: Schema.Types.ObjectId,
        ref: 'EmailTemplate',
    },
    subject: {
        type: String,
        trim: true,
    },
    emailBody: {
        type: String,
        trim: true,
    },
    appliedAt: {
        type: Date,
    },
    lastEmailSentAt: {
        type: Date,
    },
    followUpDate: {
        type: Date,
    },
    notes: {
        type: String,
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
export const Application = mongoose.model('Application', applicationSchema);
//# sourceMappingURL=application.model.js.map