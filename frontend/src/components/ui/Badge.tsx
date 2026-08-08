import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "orange"
    | "gold"
    | "cyan"
    | "emerald"
    | "rose"
    | "purple"
    | "secondary"
    | "outline"
    | "flagged";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "orange",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary:
      "bg-court-orange/15 text-court-orange border-court-orange/40 shadow-sm shadow-orange-950",
    orange:
      "bg-court-orange/15 text-court-orangeLight border-court-orange/40 font-bold",
    gold:
      "bg-amber-400/15 text-amber-300 border-amber-400/40 font-bold",
    cyan:
      "bg-sky-400/15 text-sky-300 border-sky-400/40 font-bold",
    emerald:
      "bg-emerald-400/15 text-emerald-300 border-emerald-400/40 font-bold",
    rose:
      "bg-rose-500/15 text-rose-300 border-rose-500/40 font-bold",
    purple:
      "bg-purple-500/15 text-purple-300 border-purple-500/40 font-bold",
    secondary:
      "bg-court-card text-muted-foreground border-court-border",
    outline:
      "bg-transparent text-muted-foreground border-court-border hover:text-foreground",
    flagged:
      "bg-court-purple/15 text-purple-300 border-purple-500/30 uppercase tracking-wider font-mono",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 rounded-md gap-1",
    md: "text-xs px-2.5 py-1 rounded-lg gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-athletic uppercase tracking-wider border transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
