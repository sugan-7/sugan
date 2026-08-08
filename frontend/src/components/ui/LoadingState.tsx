"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Calculating performance metrics...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-court-border/60 p-12 text-center flex flex-col items-center justify-center space-y-4 bg-court-charcoal/40 glass-panel",
        className
      )}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-court-border border-t-court-orange animate-spin" />
        <div className="w-5 h-5 rounded-full bg-court-orange/20 animate-pulse-glow" />
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-athletic">
        {message}
      </p>
    </div>
  );
}
