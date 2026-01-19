import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    isCollapsed?: boolean;
    onClick?: () => void;
}

export const NavItem = ({ icon, label, href, isCollapsed, onClick }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li>
            <Link
                href={href}
                onClick={onClick}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 
                ${isActive
                        ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                    } ${isCollapsed ? 'justify-center' : ''}`}
            >
                <span className={`${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
                    {icon}
                </span>
                {!isCollapsed && <span className="truncate">{label}</span>}
            </Link>
        </li>
    );
};