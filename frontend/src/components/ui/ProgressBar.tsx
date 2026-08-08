import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 - 100
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{label}</span>
          <span className="font-mono">{clampedValue}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-gradient-to-r from-court-gold to-court-orange transition-all duration-500 rounded-full"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
