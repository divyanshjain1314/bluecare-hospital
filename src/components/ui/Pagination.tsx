import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false
}: PaginationProps) => {

    if (totalPages <= 1) return null;

    const btnClass = "p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all text-slate-600";
    const activePageClass = "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-100";
    const inactivePageClass = "border-slate-200 hover:bg-slate-50 text-slate-600";

    return (
        <div className="flex items-center justify-between px-2 py-6 font-outfit">
            <div className="hidden sm:block">
                <p className="text-sm text-slate-500">
                    Showing page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span>
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1 || isLoading}
                    className={btnClass}
                    title="First Page"
                >
                    <ChevronDoubleLeftIcon className="size-4" />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className={btnClass}
                >
                    <ChevronLeftIcon className="size-4" />
                </button>

                <div className="flex items-center gap-1 mx-2">
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`size-9 rounded-xl text-sm font-bold transition-all ${currentPage === pageNum ? activePageClass : inactivePageClass
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return <span key={pageNum} className="text-slate-400">...</span>;
                        }
                        return null;
                    })}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className={btnClass}
                >
                    <ChevronRightIcon className="size-4" />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages || isLoading}
                    className={btnClass}
                    title="Last Page"
                >
                    <ChevronDoubleRightIcon className="size-4" />
                </button>
            </div>
        </div>
    );
};