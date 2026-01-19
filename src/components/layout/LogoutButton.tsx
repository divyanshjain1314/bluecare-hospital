'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '@/store/features/authSlice';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
            <ArrowLeftOnRectangleIcon className="size-5" />
            <span>Sign Out</span>
        </button>
    );
};