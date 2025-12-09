import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", icon: Icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-4 py-2 transition-colors duration-300 rounded-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/50 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-black text-white hover:bg-neutral-800": variant === "primary",
            "bg-neutral-100 hover:bg-neutral-200 text-black": variant === "secondary",
            "border border-black/10 hover:bg-neutral-50": variant === "outline",
            "hover:bg-neutral-100": variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children && (
          <span 
            className={cn(
              "font-mono text-xs uppercase tracking-wide",
              variant === "primary" && "text-white"
            )}
          >
            {children}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };