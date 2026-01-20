'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChartBarIcon,
    ArrowDownTrayIcon,
    CheckBadgeIcon,
    ClockIcon,
    ExclamationCircleIcon,
    ArrowPathIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
    const [stats, setStats] = useState({
        total: 0,
        occupied: 0,
        available: 0,
        maintenance: 0,
        byType: {},
        byDept: []
    });
    const [loading, setLoading] = useState(true);

    const fetchReportData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/reports/beds');
            setStats(res.data);
        } catch (err) {
            console.error("Report Fetch Error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReportData(); }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <ArrowPathIcon className="size-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 font-outfit min-h-screen bg-[#fcfdfe] dark:bg-slate-950">
            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">
                        REPORTS<span className="text-blue-600">.</span>OS
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        System Intelligence & Inventory Analytics
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchReportData}
                        className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ArrowPathIcon className="size-5" />
                    </button>
                    <Button className="rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-6 h-12 shadow-xl shadow-slate-200">
                        <ArrowDownTrayIcon className="size-4 mr-2" /> Export Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard label="Total Units" value={stats.total} icon={<ChartBarIcon />} color="text-blue-600" bg="bg-blue-50" />
                <StatCard label="Live Occupancy" value={stats.occupied} icon={<CheckBadgeIcon />} color="text-emerald-600" bg="bg-emerald-50" />
                <StatCard label="Ready to Admit" value={stats.available} icon={<ClockIcon />} color="text-amber-600" bg="bg-amber-50" />
                <StatCard label="Down Time" value={stats.maintenance} icon={<ExclamationCircleIcon />} color="text-rose-600" bg="bg-rose-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-8">
                        <BuildingOfficeIcon className="size-5 text-slate-400" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Ward Occupancy Levels</h3>
                    </div>
                    <div className="space-y-8">
                        {stats.byDept.map((dept: any) => (
                            <div key={dept.name} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{dept.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Capacity Management</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{Math.round((dept.occupied / dept.total) * 100)}%</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{dept.occupied} / {dept.total} Beds</p>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${(dept.occupied / dept.total) > 0.8 ? 'bg-rose-500' : 'bg-blue-600'
                                            }`}
                                        style={{ width: `${(dept.occupied / dept.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Asset Distribution</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(stats.byType).map(([type, count]: any) => (
                                <div key={type} className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-200 transition-all">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{type} Units</p>
                                            <p className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">{count}</p>
                                        </div>
                                        <div className="size-10 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors shadow-sm">
                                            <ChartBarIcon className="size-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color, bg }: any) {
    return (
        <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className={`p-4 rounded-3xl ${bg} ${color} transition-transform group-hover:scale-110`}>
                <div className="size-6">{icon}</div>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">{value}</h2>
            </div>
        </div>
    );
}