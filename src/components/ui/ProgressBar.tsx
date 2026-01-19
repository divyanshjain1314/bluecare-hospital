interface ProgressBarProps {
  label: string;
  percentage: number;
  subText?: string;
}

export const ProgressBar = ({ label, percentage, subText }: ProgressBarProps) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between items-center text-sm font-medium">
      <span className="text-slate-700 dark:text-slate-300">{label}</span>
      <span className="text-slate-900 dark:text-white">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
      <div 
        className="bg-blue-600 h-full rounded-full transition-all duration-500" 
        style={{ width: `${percentage}%` }}
      />
    </div>
    {subText && <p className="text-[10px] text-slate-400 italic">{subText}</p>}
  </div>
);