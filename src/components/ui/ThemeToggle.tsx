'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '@/store/features/themeSlice'; 
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: any) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-blue-500 transition-all"
    >
      {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
};