import { Schema, model, Types } from 'mongoose';
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    location: {
        type: String,
        default: null,
        trim: true,
    },
    headline: {
        type: String,
        default: null,
        trim: true,
        maxlength: 120,
    },
    bio: {
        type: String,
        default: null,
        trim: true,
        maxlength: 500,
    },
    linkedinUrl: {
        type: String,
        default: null,
        trim: true,
    },
    githubUrl: {
        type: String,
        default: null,
        trim: true,
    },
    portfolioUrl: {
        type: String,
        default: null,
        trim: true,
    },
    resumeUrl: {
        type: String,
        default: null,
        trim: true,
    },
    skills: {
        type: [String],
        default: [],
    },
    experienceYears: {
        type: Number,
        default: 0,
        min: 0,
    },
    currentCompany: {
        type: String,
        default: null,
        trim: true,
    },
    currentDesignation: {
        type: String,
        default: null,
        trim: true,
    },
}, {
    timestamps: true,
});
const Profile = model('Profile', profileSchema);
export default Profile;
//# sourceMappingURL=profile.model.js.map