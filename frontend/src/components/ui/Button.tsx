import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "lg" | "icon"; // 🟢 Added size prop
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "default", // 🟢 Default to "default"
  isLoading, 
  className, 
  ...props 
}: ButtonProps) => {
  const baseStyles = "rounded-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200",
    outline: "border border-slate-900 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  // 🟢 Define size classes
  const sizes = {
    default: "px-6 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-8 py-4 text-base",
    icon: "h-10 w-10", // 🟢 Necessary for the ModeToggle square shape
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : children}
    </button>
  );
};