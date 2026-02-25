import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        sparse: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { type: String },
    role: {
        type: String,
        enum: ['doctor', 'admin', 'superadmin', 'nurse', 'staff', 'patient'],
        default: 'patient'
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Inactive', 'Suspended', 'Retired', 'Stable'],
        default: 'Active'
    },
    age: { type: Number },

    image: { type: String },
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

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting',
        required: function () { return this.role === 'admin' || this.role === 'doctor'; }
    },

}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true });

export default models.User || model('User', UserSchema);