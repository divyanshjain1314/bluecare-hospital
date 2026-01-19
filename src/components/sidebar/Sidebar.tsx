'use client';

import { usePathname } from 'next/navigation';
import {
    Squares2X2Icon,
    UsersIcon,
    CalendarIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    Square3Stack3DIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { NavItem } from './NavItem';

interface SidebarProps {
    isCollapsed: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: 'Dashboard', icon: <Squares2X2Icon className="size-5" />, href: '/dashboard' },
    { label: 'Patients', icon: <UsersIcon className="size-5" />, href: '/dashboard/patients' },
    { label: 'Appointments', icon: <CalendarIcon className="size-5" />, href: '/dashboard/appointments' },
    { label: 'Doctors', icon: <UserGroupIcon className="size-5" />, href: '/dashboard/doctors' },
    { label: 'Departments', icon: <BuildingOfficeIcon className="size-5" />, href: '/dashboard/departments' },
    { label: 'Beds & ICU', icon: <Square3Stack3DIcon className="size-5" />, href: '/dashboard/beds' },
    { label: 'Reports', icon: <ChartBarIcon className="size-5" />, href: '/dashboard/reports' },
    { label: 'Settings', icon: <Cog6ToothIcon className="size-5" />, href: '/dashboard/settings' },
];

export const Sidebar = ({ isCollapsed, isOpen, onClose }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden cursor-pointer"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 bottom-0 z-50 h-dvh border-r border-slate-200 bg-white/95 backdrop-blur transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950/95 md:sticky md:z-auto ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'} ${isCollapsed ? 'md:w-20' : 'md:w-72'}`}>
                <div className="flex h-full flex-col">

                    <div className="flex items-center gap-3 px-4 py-6">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-800">
                            <span className="text-sm font-bold font-outfit">HC</span>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 animate-in fade-in slide-in-from-left-2">
                                <div className="truncate text-sm font-semibold text-slate-900 dark:text-white font-outfit">Hospital Admin</div>
                                <div className="truncate text-xs text-slate-500 dark:text-slate-400">Operations</div>
                            </div>
                        )}
                        <button onClick={onClose} className="ml-auto cursor-pointer p-1 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden">
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>

                    <nav className="flex-1 px-3 pb-4 overflow-y-auto overflow-x-hidden">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <NavItem
                                    key={item.label}
                                    icon={item.icon}
                                    label={item.label}
                                    isCollapsed={isCollapsed}
                                    href={item.href}
                                />
                            ))}
                        </ul>
                    </nav>

                    {!isCollapsed && (
                        <div className="px-4 pb-6 animate-in fade-in duration-500">
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-800">
                                <div className="text-xs font-semibold text-slate-900 dark:text-white font-outfit">Shift Summary</div>
                                <div className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                                    OPD peaks at 11:00–13:00. <br /> ICU monitoring active.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};