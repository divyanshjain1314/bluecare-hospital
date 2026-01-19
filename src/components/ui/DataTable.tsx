'use client';
import React from 'react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export function DataTable<T>({ columns, data, isLoading, emptyMessage = "No records found" }: DataTableProps<T>) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 overflow-hidden font-outfit transition-colors">
            <div className="max-h-120 overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    Loading data...
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className={`px-6 py-4 text-slate-600 dark:text-slate-400 ${col.className || ''}`}>
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(item)
                                                : (item[col.accessor] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <p className="text-slate-500">{emptyMessage}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}