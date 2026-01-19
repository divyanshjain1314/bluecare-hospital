import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String },
    role: {
        type: String,
        enum: ['doctor', 'admin', 'superadmin'],
        default: 'doctor'
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Inactive', 'Suspended', 'Retired'],
        default: 'Active'
    },
    image: { type: String },
    specialization: { type: String },
    phone: { type: String },
    invitationToken: {
        type: String,
        default: null
    },
    invitationTokenExpires: {
        type: Date,
        default: null
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default models.User || model('User', UserSchema);