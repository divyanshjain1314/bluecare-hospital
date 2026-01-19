'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const ThemeWatcher = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (darkMode) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [darkMode]);

    return null;
};