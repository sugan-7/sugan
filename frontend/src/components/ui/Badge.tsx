import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "orange" | "secondary" | "destructive" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-court-card text-foreground border-border",
    gold: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "text-foreground border-border bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
