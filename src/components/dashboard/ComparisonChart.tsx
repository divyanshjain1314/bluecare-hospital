// components/dashboard/ComparisonChart.tsx
'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ComparisonChartProps {
  opdData: any;
  ipdData: any;
}
export const ComparisonChart = ({ opdData, ipdData }: ComparisonChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'var(--font-outfit)',
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    colors: ['#3b82f6', '#bfe0fe'],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      labels: { style: { colors: '#64748b', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 80,
      tickAmount: 4,
      labels: { style: { colors: '#64748b', fontSize: '12px' } },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
    },
  };

  const series = [
    { name: 'OPD', data: opdData },
    { name: 'IPD', data: ipdData }
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="px-5 pt-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">OPD vs IPD (Week)</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Comparison of outpatient vs inpatient volume.</p>
      </div>
      <div className="px-5 pb-5">
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/50 dark:ring-slate-700">
          <div className="h-44 w-full">
            <Chart options={options} series={series} type="bar" height="100%" />
          </div>
        </div>
        {/* Exact Footer Legend from your HTML */}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-blue-500"></span>
            <span>OPD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-blue-200"></span>
            <span>IPD</span>
          </div>
        </div>
      </div>
    </section>
  );
};