import React from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  statusLabel?: string;
  isPlatformDerived?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  subtext,
  trend,
  trendValue,
  statusLabel,
  isPlatformDerived = true,
  className,
}: MetricCardProps) {
  const hasData = value !== null && value !== undefined && value !== "";

  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 p-5 bg-card/80 glass-panel flex flex-col justify-between transition-all hover:border-court-gold/40 relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {statusLabel && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-secondary text-foreground border border-border">
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 my-1">
        {hasData ? (
          <>
            <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono">
              {value}
            </span>
            {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
          </>
        ) : (
          <span className="text-lg font-medium text-muted-foreground italic">
            Insufficient data
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border/40">
        <span>{subtext || (isPlatformDerived ? "Platform indicator" : "Verified measurement")}</span>
        {trendValue && (
          <span
            className={cn(
              "font-medium",
              trend === "up" && "text-emerald-400",
              trend === "down" && "text-rose-400",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
