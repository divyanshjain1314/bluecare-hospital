'use client';
import { BoltIcon, CloudIcon, ExclamationTriangleIcon, HomeIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TYPE_CONFIG: any = {
    ICU: { icon: BoltIcon, text: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    Ventilator: { icon: CloudIcon, text: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
    Emergency: { icon: ExclamationTriangleIcon, text: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    General: { icon: HomeIcon, text: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' }
};

export const BedCard = ({ bed, isSelected, onSelect, onDelete, departments }: any) => {
    const config = TYPE_CONFIG[bed.type] || TYPE_CONFIG.General;
    const Icon = config.icon;

    const departmentObj = departments.find((dept: any) => dept.value === bed.department);
    const departmentName = departmentObj ? departmentObj.label : 'Unknown Dept';

    return (
        <div
            onClick={() => onSelect(bed._id)}
            className={`relative p-4 rounded-2xl border transition-all cursor-pointer shadow-sm
            ${isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 hover:border-blue-400'}`}
        >
            <div className="flex justify-between items-center mb-3">
                <div className={`p-2 rounded-lg ${config.bg} ${config.text}`}>
                    <Icon className="size-5" />
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`size-2 rounded-full ${bed.status === 'Available' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{bed.status}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{bed.bedNumber}</h3>
            <p className="text-[10px] font-semibold text-slate-400 uppercase mb-4">{bed.type} Unit</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-medium text-slate-500 truncate w-24 uppercase">{departmentName}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(bed._id, bed.status); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                    <TrashIcon className="size-4" />
                </button>
            </div>

            {isSelected && (
                <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="size-5 text-blue-600 fill-blue-50" />
                </div>
            )}
        </div>
    );
};