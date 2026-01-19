import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
    return (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-outfit">
                {title}
            </h1>
            {description && (
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
};