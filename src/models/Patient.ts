import mongoose, { Schema, model, models } from 'mongoose';

const PatientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    lastVisit: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: { type: String, enum: ['Stable', 'Critical', 'Recovered'], default: 'Stable' },
    createdBy: { type: String, required: true }, // Doctor's email
}, { timestamps: true });

const Patient = models.Patient || model('Patient', PatientSchema);
export default Patient;