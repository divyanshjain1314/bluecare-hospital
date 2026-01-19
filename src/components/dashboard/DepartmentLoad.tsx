'use client';
import { useEffect, useState } from 'react';
import { DepartmentCard } from './DepartmentCard';

export const DepartmentLoad = () => {
    const [departments, setDepartments] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/dashboard');
                const data = await res.json();
                setDepartments(data.departmentLoad || []);
            } catch (error) {
                console.error("Error loading departments:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="mt-8 font-outfit">
            <div className="mb-3 flex items-end justify-between">
                <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Department Load</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Capacity utilization by department.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {departments.map((dept) => (
                    <DepartmentCard
                        key={dept.id}
                        name={dept.name}
                        percentage={dept.load}
                        status={
                            dept.load >= 75 ? "High load — monitor staffing" :
                                dept.load >= 50 ? "Normal load" : "Low load"
                        }
                    />
                ))}
            </div>
        </section>
    );
};