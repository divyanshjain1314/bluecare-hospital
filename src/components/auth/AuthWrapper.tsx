import React from 'react';

interface AuthWrapperProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export const AuthWrapper = ({ children, title, subtitle }: AuthWrapperProps) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-outfit transition-colors dark:bg-slate-950">
            <div className="w-full max-w-110 space-y-8 animate-in fade-in zoom-in-95 duration-500">

                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none">
                        <span className="text-xl font-bold">HC</span>
                    </div>
                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {subtitle}
                    </p>
                </div>

                <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
                    {children}
                </div>

                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    BlueCare Health Systems © 2026 • Secure HIPAA Compliant Portal
                </p>
            </div>
        </div>
    );
};