import React from 'react';
import { AppointmentsTable } from './AppointmentsTable';
import { AlertsList } from './AlertsList';

interface AppointmentsAndAlertsProps {
    appointments: any[];
    alerts?: any[];
}

export const AppointmentsAndAlerts = ({ appointments, alerts }: AppointmentsAndAlertsProps) => {
    return (
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-3 font-outfit">
            <div className="xl:col-span-2">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Appointments
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Upcoming appointments overview.
                    </p>
                </div>
                <AppointmentsTable data={appointments} />
            </div>

            <div>
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Alerts
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Operational warnings requiring attention.
                    </p>
                </div>
                <AlertsList />
            </div>
        </section>
    );
};