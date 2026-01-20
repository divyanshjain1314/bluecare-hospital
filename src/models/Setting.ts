import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true, default: 'My Hospital' },
    hospitalLogo: { type: String },
    contactEmail: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    registryId: { type: String, unique: true },
    currency: { type: String, default: 'INR' },
    timeZone: { type: String, default: 'IST' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);