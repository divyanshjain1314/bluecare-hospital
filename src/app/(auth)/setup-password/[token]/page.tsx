'use client';

import { use, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/features/authSlice';

export default function SetupPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const resolvedParams = use(params);
    const token = resolvedParams.token; const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }
        if (formData.password.length < 8) {
            return setError("Password must be at least 8 characters long.");
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/setup-password', {
                token: token,
                password: formData.password
            });

            if (response.status === 200) {
                setSuccess(true);
                dispatch(setCredentials({
                    user: response.data.user,
                    token: response.data.token
                }));

                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "This link has expired or is invalid.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper
            title="Set Your Password"
            subtitle="Secure your account to access the BlueCare dashboard"
        >
            {!success ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 dark:bg-rose-900/10 dark:text-rose-400 dark:ring-rose-900/50">
                            {error}
                        </div>
                    )}

                    <Input
                        label="New Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 text-base font-semibold shadow-md"
                    >
                        {isLoading ? "Saving Password..." : "Complete Setup"}
                    </Button>
                </form>
            ) : (
                <div className="text-center py-6 space-y-4 transition-all">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Password Set!</h3>
                    <p className="text-sm text-slate-500">Your account is now secure. Redirecting you to your dashboard...</p>
                </div>
            )}
        </AuthWrapper>
    );
}