import React from 'react';

const alerts = [
    { title: "ICU Capacity Alert", desc: "ICU occupancy is at 92%. Consider escalating discharge planning.", priority: "High", theme: "rose" },
    { title: "Doctor Unavailability", desc: "Orthopedics: Dr. Sharma unavailable 2:00–4:00 PM.", priority: "Medium", theme: "amber" },
    { title: "Emergency Overload", desc: "Triage wait time increased. Route non-critical cases to OPD.", priority: "Medium", theme: "blue" },
];

export const AlertsList = () => {
    const getTheme = (theme: string) => {
        const themes: any = {
            rose: "border-rose-200 bg-rose-50/40 text-rose-800 dark:border-rose-900/50 dark:bg-rose-900/10",
            amber: "border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/10",
            blue: "border-blue-200 bg-blue-50/60 text-blue-900 dark:border-blue-900/50 dark:bg-blue-900/10"
        };
        return themes[theme];
    };

    return (
        <div className="space-y-4 font-outfit">
            {alerts.map((alert, i) => (
                <section key={i} className={`rounded-2xl border shadow-sm ${getTheme(alert.theme)}`}>
                    <div className="px-5 pb-5 pt-5">
                        <div className="text-sm font-semibold">{alert.title}</div>
                        <div className="mt-1 text-sm opacity-90">{alert.desc}</div>
                        <div className="mt-3 text-xs font-medium uppercase tracking-wider">Priority: {alert.priority}</div>
                    </div>
                </section>
            ))}
        </div>
    );
};