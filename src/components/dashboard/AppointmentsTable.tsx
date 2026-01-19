'use client';
import React from 'react';
import { Badge } from '../ui/Badge';

interface Appointment {
    patient: string;
    doctor: string;
    dept: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export const AppointmentsTable = ({ data }: { data: Appointment[] }) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 overflow-hidden font-outfit transition-colors">
            <div className="max-h-90 overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-5 py-3">Patient Name</th>
                            <th className="px-5 py-3">Doctor</th>
                            <th className="px-5 py-3">Department</th>
                            <th className="px-5 py-3">Time</th>
                            <th className="px-5 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data && data.length > 0 ? (
                            data.map((apt, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{apt.patient}</td>
                                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{apt.doctor}</td>
                                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{apt.dept}</td>
                                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{apt.time}</td>
                                    <td className="px-5 py-3">
                                        {apt.status === 'Confirmed' && <Badge variant="emerald">Confirmed</Badge>}
                                        {apt.status === 'Pending' && <Badge variant="amber">Pending</Badge>}
                                        {apt.status === 'Cancelled' && <Badge variant="rose">Cancelled</Badge>}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">No appointments found</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">There are no upcoming appointments scheduled for today.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};