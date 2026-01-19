// models/Appointment.ts
import mongoose, { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
    patientName: { type: String, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    priority: {
        type: String,
        enum: ['Normal', 'Urgent', 'Emergency'],
        default: 'Normal'
    },
}, { timestamps: true });

export default models.Appointment || model('Appointment', AppointmentSchema);