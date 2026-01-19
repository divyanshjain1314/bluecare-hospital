import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, default: 'General' },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' }
}, { timestamps: true });

export default models.User || model('User', UserSchema);