import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Patient } from '@/data/patients';

interface PatientFormProps {
    initialData?: Patient | null;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    isView?: boolean;
}

interface PatientFormData {
    name: string;
    age: number | string;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    phone: string;
    status: 'Stable' | 'Critical' | 'Recovered';
}

export const PatientForm = ({ initialData, onSubmit, isLoading, isView = false }: PatientFormProps) => {
    const [formData, setFormData] = useState<PatientFormData>({
        name: initialData?.name || '',
        age: initialData?.age || '',
        gender: initialData?.gender || 'Male',
        bloodGroup: initialData?.bloodGroup || 'o+',
        phone: initialData?.phone || '',
        status: initialData?.status || 'Stable',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Patient Full Name" placeholder="e.g. John Doe" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={isView} />

            <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} required disabled={isView} />
                <Input label="Gender" isSelect value={formData.gender}
                    onChange={handleChange}
                    options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]} />
            </div>

            <Input label="Phone Number" placeholder="+91..." value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required disabled={isView} />

            <Input label="Blood Group" isSelect value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                options={[
                    { value: 'O+', label: 'O+' }, { value: 'A+', label: 'A+' },
                    { value: 'B+', label: 'B+' }, { value: 'AB+', label: 'AB+' }
                ]} disabled={isView} />

            <Button type="submit" hide={isView} disabled={isLoading} className="w-full py-3 mt-4">
                {isLoading ? 'Saving...' : initialData ? 'Update Patient' : 'Add Patient'}
            </Button>
        </form>
    );
};