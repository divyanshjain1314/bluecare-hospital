'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

type Role = 'patient' | 'doctor' | 'admin';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<Role>('patient');

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '',
        hospitalName: '', address: '',
        specialization: '', licenseNumber: '',
        bloodGroup: '', dob: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Backend ko role aur sara data bhej rahe hain
            const response = await axios.post('/api/auth/register', { ...formData, role });
            if (response.status === 201) router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || "Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper
            title={role === 'admin' ? "Register Hospital" : role === 'doctor' ? "Doctor Onboarding" : "Create Account"}
            subtitle="Join BlueCare Health Systems"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-200">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" placeholder="John" onChange={handleChange} required />
                    <Input label="Last Name" name="lastName" placeholder="Doe" onChange={handleChange} required />
                </div>

                <Input label="Email Address" name="email" type="email" placeholder="name@hospital.com" onChange={handleChange} required />


                {role === 'admin' && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <Input label="Hospital Name" name="hospitalName" placeholder="City General Hospital" onChange={handleChange} required />
                        <Input label="Hospital Address" name="address" placeholder="Full Location" onChange={handleChange} required />
                    </div>
                )}

                {role === 'doctor' && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                        <Input label="Specialization" name="specialization" placeholder="Cardiologist" onChange={handleChange} required />
                        <Input label="License No." name="licenseNumber" placeholder="MC-12345" onChange={handleChange} required />
                    </div>
                )}

                {role === 'patient' && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                        <Input
                            label="Blood Group"
                            name="bloodGroup"
                            isSelect
                            onChange={handleChange}
                            options={[
                                { value: 'O+', label: 'O+' }, { value: 'A+', label: 'A+' },
                                { value: 'B+', label: 'B+' }, { value: 'AB+', label: 'AB+' }
                            ]}
                        />
                        <Input label="DOB" name="dob" type="date" onChange={handleChange} required />
                    </div>
                )}

                <Input label="Password" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />

                <Button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-blue-600 rounded-2xl font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-blue-200">
                    {isLoading ? "Wait..." : `Register as ${role}`}
                </Button>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-3">
                    {role !== 'doctor' && (
                        <p className="text-[11px] font-medium text-slate-500">
                            Are you a Doctor?{' '}
                            <button type="button" onClick={() => setRole('doctor')} className="text-blue-600 font-bold hover:underline">
                                Register as Doctor
                            </button>
                        </p>
                    )}

                    {role !== 'admin' && (
                        <p className="text-[11px] font-medium text-slate-500">
                            Having a hospital?{' '}
                            <button type="button" onClick={() => setRole('admin')} className="text-blue-600 font-bold hover:underline">
                                Register Hospital
                            </button>
                        </p>
                    )}

                    {role !== 'patient' && (
                        <p className="text-[11px] font-medium text-slate-500">
                            Not a medical staff?{' '}
                            <button type="button" onClick={() => setRole('patient')} className="text-blue-600 font-bold hover:underline">
                                Register as Patient
                            </button>
                        </p>
                    )}

                    <div className="pt-4 text-xs">
                        <span className="text-slate-500">Already have an account?</span>{' '}
                        <Link href="/login" className="font-bold text-slate-900 hover:text-blue-600 transition-all">Sign In</Link>
                    </div>
                </div>
            </form>
        </AuthWrapper>
    );
}