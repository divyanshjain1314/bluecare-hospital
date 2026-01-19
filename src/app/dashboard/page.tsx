'use client';
import { ComparisonChart } from '@/components/dashboard/ComparisonChart';
import { DepartmentLoad } from '@/components/dashboard/DepartmentLoad';
import { PatientFlowChart } from '@/components/dashboard/PatientFlowChart';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { PageHeader } from '@/components/layout/PageHeader';
import { useEffect, useState } from 'react';
import { AppointmentsAndAlerts } from '@/components/dashboard/AppointmentsAndAlerts';
import axios from 'axios';

export default function DashboardPage() {
    const [appointments, setAppointments] = useState([]);
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        fetchAppointments();
        getCharts();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/dashboard');
            setAppointments(response.data.appointments || []);
        } catch (error) {
            console.error("Axios fetch error:", error);
        } finally {
            console.log("Axios fetch completed");
        }
    };

    const getCharts = async () => {
        try {
            const response = await axios.get('/api/dashboard');
            const chartData = {
                patientFlow: response.data.patientFlow,
                comparison: response.data.comparison,
            };
            setChartData(chartData);
        } catch (error) {
            console.error("Axios fetch error:", error);
        } finally {
            console.log("Axios fetch completed");
        }
    };

    return (
        <>
            <div className="space-y-8">
                <PageHeader
                    title="Dashboard"
                    description="Live operational snapshot for today."
                />

                <StatsGrid />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <PatientFlowChart data={chartData?.patientFlow} />
                    <ComparisonChart
                        opdData={chartData?.comparison?.opd}
                        ipdData={chartData?.comparison?.ipd}
                    />
                </div>
                <DepartmentLoad />

                <AppointmentsAndAlerts
                    appointments={appointments || []}
                />
            </div>

        </>
    );
}



