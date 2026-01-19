import { ReactNode } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

export const Dropdown = ({ isOpen, onClose, trigger, children, className = "" }: DropdownProps) => {
    const dropdownRef = useOutsideClick(onClose);

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <div onClick={() => (isOpen ? onClose() : null)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-100 z-50">
                    {children}
                </div>
            )}
        </div>
    );
};