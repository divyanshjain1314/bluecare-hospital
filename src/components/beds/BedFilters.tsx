'use client';

export const BedFilters = ({ activeFilter, onFilterChange, beds }: any) => {
    const tabs = ['All', 'General', 'ICU', 'Ventilator', 'Emergency'];

    return (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {tabs.map((type) => (
                <button
                    key={type}
                    onClick={() => onFilterChange(type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all
                            ${activeFilter === type
                            ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm border border-slate-100 dark:border-slate-700'
                            : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {type}
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeFilter === type ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        {type === 'All' ? beds.length : beds.filter((b: any) => b.type === type).length}
                    </span>
                </button>
            ))}
        </div>
    );
};

