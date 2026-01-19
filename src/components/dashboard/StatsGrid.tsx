'use client';

import { useEffect, useState } from 'react';
import { StatCard } from './StatCard';
import {
    UsersIcon,
    Square3Stack3DIcon,
    UserGroupIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

export const StatsGrid = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/dashboard');
                const data = await res.json();
                setStats(data.stats);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Patients Today"
                value={stats?.totalPatients || 0}
                trend="+8.2% vs yesterday"
                trendType="up"
                icon={<UsersIcon className="size-6" />}
            />
            <StatCard
                title="Available Beds"
                value={stats?.availableBeds || 0}
                trend="+3 beds freed"
                trendType="up"
                icon={<Square3Stack3DIcon className="size-6" />}
            />
            <StatCard
                title="Doctors On Duty"
                value={stats?.doctorsOnDuty || 0}
                trend="-2 from last shift"
                trendType="down"
                icon={<UserGroupIcon className="size-6" />}
            />
            <StatCard
                title="Emergency Queue"
                value={stats?.emergencyQueue || 0}
                trend="+4 in last hour"
                trendType="up"
                icon={<CalendarIcon className="size-6" />}
            />
        </div>
    );
};