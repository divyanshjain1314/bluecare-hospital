import React, { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    label: string;
    isSelect?: boolean;
    options?: { value: string; label: string }[];
}

export const Input = forwardRef<HTMLInputElement & HTMLSelectElement, InputProps>(
    ({ label, type = 'text', isSelect = false, options = [], className = '', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const inputType = type === 'password' && showPassword ? 'text' : type;

        const baseClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/20";

        return (
            <div className="w-full font-outfit">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {label}
                </label>

                <div className="relative">
                    {isSelect ? (
                        <select
                            ref={ref as any}
                            className={`${baseClass} appearance-none ${className}`}
                            {...(props as any)}
                        >
                            {props.placeholder && <option value="">{props.placeholder}</option>}
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            ref={ref as any}
                            type={inputType}
                            className={`${baseClass} ${className}`}
                            {...props}
                        />
                    )}

                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="size-5" />
                            ) : (
                                <EyeIcon className="size-5" />
                            )}
                        </button>
                    )}

                    {isSelect && (
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = 'Input';