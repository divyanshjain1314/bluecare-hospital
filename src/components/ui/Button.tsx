interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    hide?: boolean;
}

export const Button = ({ children, variant = 'primary', hide = false, className = '', ...props }: ButtonProps) => {

    if (hide) {
        return null;
    }

    const baseStyles = "px-4 py-2 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"; // Added cursor-pointer

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700",
        outline: "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};