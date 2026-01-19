'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/features/authSlice';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/login', formData);

            if (response.status === 200) {
                dispatch(setCredentials({
                    user: response.data.user,
                    token: response.data.token
                }));
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper
            title="Welcome Back"
            subtitle="Sign in to your medical dashboard to continue"
        >
            <form onSubmit={handleSubmit} className="space-y-5">

                {error && (
                    <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 dark:bg-rose-900/10 dark:text-rose-400 dark:ring-rose-900/50">
                        {error}
                    </div>
                )}

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="admin@bluecare.com"
                    onChange={handleChange}
                    required
                />

                <div className="space-y-1">
                    <div className="flex justify-end">
                        <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                            Forgot Password?
                        </Link>
                    </div>
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 text-base font-semibold shadow-md"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-500">Don't have an account?</span>{' '}
                    <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline">
                        Request Access
                    </Link>
                </div>
            </form>
        </AuthWrapper>
    );
}