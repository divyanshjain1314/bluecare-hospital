import React from 'react';

interface DepartmentProps {
    name: string;
    percentage: number;
    status: string;
}

export const DepartmentCard = ({ name, percentage, status }: DepartmentProps) => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors font-outfit">
            <div className="px-5 pb-5 pt-5">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{name}</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{percentage}%</div>
                </div>
                <div className="mt-3">
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                            className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                            aria-hidden="true"
                        ></div>
                    </div>
                </div>
                <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                    {status}
                </div>
            </div>
        </section>
    );
};