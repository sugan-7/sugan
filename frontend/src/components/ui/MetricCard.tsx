"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Sparkles, ShieldCheck } from "lucide-react";

export interface MetricCardProps {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  statusLabel?: string;
  isPlatformDerived?: boolean;
  isPersonalBest?: boolean;
  className?: string;
  onClick?: () => void;
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
  isPersonalBest = false,
  className,
  onClick,
}: MetricCardProps) {
  const hasData = value !== null && value !== undefined && value !== "";
  const numericValue = typeof value === "number" ? value : parseFloat(String(value));
  const isNumber = !isNaN(numericValue) && hasData;

  // Visual animated counter
  const [displayValue, setDisplayValue] = useState<number | string>(hasData ? value! : "");

  useEffect(() => {
    if (isNumber) {
      const start = 0;
      const end = numericValue;
      const duration = 800;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = start + (end - start) * ease;
        setDisplayValue(end % 1 !== 0 ? current.toFixed(1) : Math.round(current));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayValue(hasData ? value! : "");
    }
  }, [value, isNumber, numericValue, hasData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={onClick ? { scale: 1.02, transition: { duration: 0.15 } } : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl p-5 bg-court-charcoal/80 glass-panel flex flex-col justify-between transition-all duration-200 relative overflow-hidden group",
        isPersonalBest
          ? "border-court-gold/60 shadow-glow-gold bg-gradient-to-br from-court-card to-amber-950/20"
          : "border-court-border hover:border-court-orange/50 hover:shadow-glow-orange",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Background soft glow accent */}
      {isPersonalBest && (
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-court-gold/15 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Header with Label and Provenance Tag */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors font-athletic">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {isPersonalBest && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-black bg-court-gold/20 text-court-gold border border-court-gold/40">
              <Sparkles className="w-3 h-3" /> PR
            </span>
          )}
          {statusLabel && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-court-card text-muted-foreground border border-court-border">
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      {/* Primary Metric Number Display */}
      <div className="flex items-baseline gap-2 my-2">
        {hasData ? (
          <>
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-metric">
              {displayValue}
            </span>
            {unit && (
              <span className="text-sm font-bold text-muted-foreground uppercase font-athletic">
                {unit}
              </span>
            )}
          </>
        ) : (
          <span className="text-base sm:text-lg font-bold text-muted-foreground/70 italic font-athletic">
            Insufficient data
          </span>
        )}
      </div>

      {/* Footer Subtext and Trend Indicator */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 pt-2.5 border-t border-court-border/40">
        <span className="flex items-center gap-1">
          {!isPlatformDerived && <ShieldCheck className="w-3.5 h-3.5 text-court-cyan" />}
          {subtext || (isPlatformDerived ? "Derived from test logs" : "Verified measurement")}
        </span>

        {trendValue && (
          <span
            className={cn(
              "font-bold font-metric flex items-center gap-0.5 px-1.5 py-0.5 rounded",
              trend === "up" && "text-emerald-400 bg-emerald-950/40 border border-emerald-800/40",
              trend === "down" && "text-rose-400 bg-rose-950/40 border border-rose-800/40",
              trend === "neutral" && "text-muted-foreground bg-court-card"
            )}
          >
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            {trend === "neutral" && <Minus className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
      </div>
    </motion.div>
  );
}
