import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    headOfDepartment: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);