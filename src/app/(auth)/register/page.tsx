'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', department: '', password: ''
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
            const response = await axios.post('/api/auth/register', formData);

            if (response.status === 201) {
                router.push('/login');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper title="Create Account" subtitle="Join BlueCare Health Systems">
            <form onSubmit={handleSubmit} className="space-y-4">

                {error && (
                    <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 dark:bg-rose-900/10 dark:text-rose-400 dark:ring-rose-900/50">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" placeholder="John" onChange={handleChange} required />
                    <Input label="Last Name" name="lastName" placeholder="Doe" onChange={handleChange} required />
                </div>

                <Input label="Email Address" name="email" type="email" placeholder="name@hospital.com" onChange={handleChange} required />

                <Input
                    label="Department"
                    name="department"
                    isSelect
                    placeholder="Select Department"
                    onChange={handleChange}
                    required
                    options={[
                        { value: 'cardiology', label: 'Cardiology' },
                        { value: 'orthopedics', label: 'Orthopedics' },
                        { value: 'pediatrics', label: 'Pediatrics' },
                        { value: 'general', label: 'General Medicine' }
                    ]}
                />

                <Input label="Password" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />

                <div className="flex items-center gap-2 py-2">
                    <input type="checkbox" id="terms" required className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 font-outfit">
                        I agree to the <Link href="#" className="text-blue-600 font-semibold">Privacy Policy</Link>
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 font-semibold"
                >
                    {isLoading ? "Creating Account..." : "Register Account"}
                </Button>

                <div className="mt-6 text-center text-sm font-outfit">
                    <span className="text-slate-500 dark:text-slate-400">Already have an account?</span>{' '}
                    <Link
                        href="/login"
                        className="font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-all"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </AuthWrapper>
    );
}