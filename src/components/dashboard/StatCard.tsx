import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendType: 'up' | 'down';
    icon: React.ReactNode;
}

export const StatCard = ({ title, value, trend, trendType, icon }: StatCardProps) => {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md font-outfit">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    <h3 className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">
                        {value}
                    </h3>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl ring-1 ring-inset ring-blue-100 dark:ring-blue-800">
                    {icon}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={`flex items-center text-sm font-medium ${trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                    {trendType === 'up' ? (
                        <svg className="size-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    ) : (
                        <svg className="size-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                        </svg>
                    )}
                    {trend}
                </span>
            </div>
        </div>
    );
};