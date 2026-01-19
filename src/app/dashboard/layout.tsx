'use client';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Header } from '@/components/layout/Header';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-outfit transition-colors duration-300">
                <Sidebar
                    isCollapsed={isCollapsed}
                    isOpen={isMobileOpen}
                    onClose={() => setIsMobileOpen(false)}
                />

                <div className="flex flex-1 flex-col transition-all duration-300">
                    <Header
                        onMenuClick={() => setIsMobileOpen(true)}
                        onCollapseClick={() => setIsCollapsed(!isCollapsed)}
                    />

                    <main className="flex-1 p-6 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}