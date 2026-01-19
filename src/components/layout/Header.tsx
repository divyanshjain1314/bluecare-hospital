'use client';

import { useState } from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { LogoutButton } from './LogoutButton';
import { useSelector } from 'react-redux';
import { Dropdown } from '../ui/Dropdown';

interface HeaderProps {
  onMenuClick: () => void;
  onCollapseClick: () => void;
}

export const Header = ({ onMenuClick, onCollapseClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const getInitials = () => {
    if (!user) return '??';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/80 supports-backdrop-filter:bg-white/60">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl"
          >
            <Bars3Icon className="size-5" />
          </Button>

          <Button
            variant="secondary"
            onClick={onCollapseClick}
            className="hidden md:inline-flex p-2 rounded-xl"
          >
            <Bars3Icon className="size-5" />
          </Button>

          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-900 dark:text-white font-outfit">BlueCare Hospital</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role || 'User'} Dashboard</div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <MagnifyingGlassIcon className="size-5" />
            </div>
            <input
              type="search"
              placeholder="Search patients, doctors..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-2.5 text-sm text-slate-900 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-900/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button variant="secondary" className="relative p-2 rounded-xl">
            <BellIcon className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-blue-500"></span>
          </Button>

          <Dropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            trigger={
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 transition-all"
              >
                <div className="flex size-8 items-center justify-center overflow-hidden rounded-xl bg-blue-50 ring-1 ring-inset ring-blue-100 dark:bg-blue-900/30 dark:ring-blue-800">
                  {user?.image ? (
                    <img src={user.image} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">{getInitials()}</span>
                  )}
                </div>
                <span className="hidden max-w-40 truncate md:inline dark:text-slate-200 font-medium">
                  {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </span>
                <ChevronDownIcon className={`size-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
            }
          >
            <div className="px-4 py-3">
              <div className="text-sm font-semibold dark:text-white">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
              <div className="mt-1 inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {user?.role}
              </div>
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="p-1">
              <button className="flex w-full items-center px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                My Profile
              </button>
              <LogoutButton />
            </div>
          </Dropdown>

        </div>
      </div>
    </header>
  );
};