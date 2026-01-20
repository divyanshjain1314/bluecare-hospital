import mongoose from 'mongoose';

const BedSchema = new mongoose.Schema({
    bedNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    type: {
        type: String,
        required: true,
        enum: ['General', 'ICU', 'Ventilator', 'Semi-Private', 'Emergency'],
        default: 'General'
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Available', 'Occupied', 'Maintenance', 'Reserved'],
        default: 'Available'
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        default: null
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

BedSchema.index({ status: 1, type: 1, department: 1 });

export default mongoose.models.Bed || mongoose.model('Bed', BedSchema);