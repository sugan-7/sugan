"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gold" | "glow";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-athletic tracking-wide rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-court-orange focus:ring-offset-2 focus:ring-offset-court-dark disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-court-orange to-orange-500 hover:from-court-orangeLight hover:to-orange-400 text-white font-black shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 border border-orange-400/30 active:scale-[0.98]",
      gold:
        "bg-gradient-to-r from-court-gold to-amber-400 hover:from-court-goldLight hover:to-amber-300 text-court-dark font-black shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 border border-amber-300/40 active:scale-[0.98]",
      glow:
        "bg-court-charcoal hover:bg-court-card text-court-orange font-black border border-court-orange/40 hover:border-court-orange shadow-glow-orange active:scale-[0.98]",
      secondary:
        "bg-court-card hover:bg-court-cardHover text-foreground border border-court-border hover:border-slate-700 active:scale-[0.98]",
      outline:
        "bg-transparent hover:bg-court-card text-foreground border border-court-border hover:border-court-orange/60 active:scale-[0.98]",
      ghost:
        "bg-transparent hover:bg-court-card/60 text-muted-foreground hover:text-foreground active:scale-[0.98]",
      destructive:
        "bg-court-rose/20 hover:bg-court-rose/30 text-rose-300 border border-court-rose/40 font-bold active:scale-[0.98]",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1 gap-1.5 rounded-lg",
      sm: "text-xs px-3.5 py-1.5 gap-1.5 rounded-lg font-bold",
      md: "text-sm px-5 py-2.5 gap-2 rounded-xl font-bold",
      lg: "text-base px-6 py-3.5 gap-2.5 rounded-xl font-extrabold tracking-wider",
      xl: "text-lg px-8 py-4 gap-3 rounded-2xl font-black tracking-wider uppercase",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading..."
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
