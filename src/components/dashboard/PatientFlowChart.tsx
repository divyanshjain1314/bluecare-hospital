'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PatientFlowChartProps {
  data: any;
}
export const PatientFlowChart = ({ data }: PatientFlowChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'var(--font-outfit)',
    },
    colors: ['#3b82f6'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      labels: { style: { colors: '#64748b', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 40,
      tickAmount: 4,
      labels: { style: { colors: '#64748b', fontSize: '12px' } },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
    },
  };

  const series = [{ name: 'Patients', data }];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="px-5 pt-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Patient Flow (Hourly)</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Patient inflow trend across the day.</p>
      </div>
      <div className="px-5 pb-5">
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/50 dark:ring-slate-700">
          <div className="h-44 w-full">
            <Chart options={options} series={series} type="line" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};