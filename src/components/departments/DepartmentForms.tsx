// components/departments/DepartmentForm.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface DepartmentFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    mode: string
}

export const DepartmentForm = ({ initialData, onSubmit, isLoading, mode }: DepartmentFormProps) => {
    const isDisabled = mode === 'view';
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        headOfDepartment: initialData?.headOfDepartment || '',
        description: initialData?.description || '',
        status: initialData?.status || 'Active'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 font-outfit">
            {/* Department Name */}
            <Input
                label="Department Name"
                placeholder="e.g. Cardiology"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isDisabled}
            />

            {/* Head of Department (H.O.D) */}
            <Input
                label="Head of Department"
                placeholder="Enter Doctor Name"
                value={formData.headOfDepartment}
                onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
                disabled={isDisabled}
            />

            {/* Status Selection */}
            <Input
                label="Status"
                isSelect
                value={formData.status}
                options={[
                    { value: 'Active', label: '🟢 Active' },
                    { value: 'Inactive', label: '🔴 Inactive' },
                ]}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                disabled={isDisabled}
            />

            {/* Description Area */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Description
                </label>
                <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-4 dark:focus:ring-blue-900/20"
                    placeholder="Briefly describe the department's function..."
                    disabled={isDisabled}
                />
            </div>

            {/* Action Button */}
            {
                mode === 'view' ? null : (
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 shadow-xl shadow-blue-100/50 dark:shadow-none"
                    >
                        {isLoading ? 'Processing...' : initialData ? 'Update Department' : 'Create Department'}
                    </Button>
                )
            }

        </form>
    );
};