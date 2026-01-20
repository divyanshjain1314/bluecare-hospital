import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ['doctor', 'admin', 'superadmin', 'nurse', 'staff', 'patient'],
        default: 'patient'
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Inactive', 'Suspended', 'Retired'],
        default: 'Active'
    },

    image: { type: String },
    phone: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dob: { type: Date },
    address: { type: String },

    specialization: { type: String },
    department: { type: String },
    experience: { type: Number },
    licenseNumber: { type: String },
    degree: { type: String },

    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    emergencyContact: { type: String },
    allergies: [{ type: String }],

    invitationToken: { type: String, default: null },
    invitationTokenExpires: { type: Date, default: null },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting',
        required: function () { return this.role === 'admin'; }
    },

}, { timestamps: true });

// Performance ke liye indexing
UserSchema.index({ email: 1, role: 1 });

export default models.User || model('User', UserSchema);