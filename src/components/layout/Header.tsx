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

interface HeaderProps {
  onMenuClick: () => void;
  onCollapseClick: () => void;
}

export const Header = ({ onMenuClick, onCollapseClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/80 supports-[backdrop-filter]:bg-white/60">
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
            <div className="text-xs text-slate-500 dark:text-slate-400">Admin Dashboard</div>
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
          <div className="flex items-center justify-center min-w-[40px]">
            <ThemeToggle />
          </div>

          <Button variant="secondary" className="relative p-2 rounded-xl">
            <BellIcon className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-blue-500"></span>
          </Button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 transition-all"
            >
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-100 dark:bg-blue-900/30 dark:text-blue-400">SA</span>
              <span className="hidden max-w-40 truncate md:inline dark:text-slate-200 font-medium">Super Admin</span>
              <ChevronDownIcon className={`size-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3">
                  <div className="text-sm font-semibold dark:text-white">Super Admin</div>
                  <div className="text-xs text-slate-500">admin@bluecare.com</div>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="p-1">
                  <button className="flex w-full cursor-pointer items-center px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                    Profile
                  </button>
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};