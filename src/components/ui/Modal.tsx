import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 dark:bg-slate-900 dark:border dark:border-slate-800 font-outfit">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800">
                        <XMarkIcon className="size-6 text-slate-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};