"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  unit?: string;
  helper?: string;
  accent?: "orange" | "gold" | "cyan" | "emerald" | "rose" | "purple";
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  unit,
  helper,
  accent = "orange",
  className,
}: StatCardProps) {
  const accentGlows = {
    orange: "border-court-orange/30 hover:border-court-orange/60 text-court-orange",
    gold: "border-court-gold/30 hover:border-court-gold/60 text-court-gold",
    cyan: "border-court-cyan/30 hover:border-court-cyan/60 text-court-cyan",
    emerald: "border-court-emerald/30 hover:border-court-emerald/60 text-court-emerald",
    rose: "border-court-rose/30 hover:border-court-rose/60 text-rose-400",
    purple: "border-court-purple/30 hover:border-court-purple/60 text-purple-400",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-4 bg-court-charcoal/70 glass-panel border transition-all duration-200 flex items-center justify-between gap-4",
        accentGlows[accent],
        className
      )}
    >
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-athletic block">
          {label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-white font-metric tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-bold text-muted-foreground font-athletic uppercase">
              {unit}
            </span>
          )}
        </div>
        {helper && <p className="text-[10px] text-muted-foreground">{helper}</p>}
      </div>

      {icon && (
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center bg-court-card border border-court-border/60 shrink-0",
            accentGlows[accent]
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
