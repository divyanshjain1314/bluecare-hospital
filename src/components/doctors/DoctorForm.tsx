import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const DoctorForm = ({ onSubmit, isLoading, initialData, mode }: any) => {
    const isDisabled = mode === "view";
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        department: initialData?.department || 'General Medicine',
        specialization: initialData?.specialization || '',
        status: initialData?.status || 'Active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const STATUS_OPTIONS = [
        { value: 'Active', label: '🟢 Active' },
        { value: 'On Leave', label: '🟡 On Leave' },
        { value: 'Inactive', label: '🔴 Inactive' },
        { value: 'Suspended', label: '🚫 Suspended' },
        { value: 'Retired', label: '📁 Retired' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-5 font-outfit">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    disabled={isDisabled}
                />
                <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    disabled={isDisabled}

                />
            </div>

            <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isDisabled}

            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Department"
                    isSelect
                    value={formData.department}
                    options={[
                        { value: 'General Medicine', label: 'General Medicine' },
                        { value: 'Cardiology', label: 'Cardiology' },
                        { value: 'Neurology', label: 'Neurology' },
                        { value: 'Pediatrics', label: 'Pediatrics' },
                    ]}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    disabled={isDisabled}

                />
                <Input
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isDisabled}

                />
            </div>

            <Input
                label="Specialization"
                placeholder="e.g. Heart Surgeon"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                disabled={isDisabled}

            />
            <Input
                label="Employment Status"
                isSelect
                value={formData.status}
                options={STATUS_OPTIONS}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="focus:ring-blue-500/20"
            />

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
                    <b>Note:</b> A welcome email will be sent to the doctor with a secure link to set up their account password.
                </p>
            </div>
            {
                mode !== "view" && (
                    <Button type="submit" disabled={isLoading} className="w-full py-4">
                        {isLoading ? 'Sending Invitation...' : mode === 'add' ? 'Add Doctor & Send Invitation' : 'Update Doctor'}
                    </Button>
                )
            }
        </form>
    );
};