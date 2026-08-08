"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: "orange" | "gold" | "cyan" | "emerald";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = "orange",
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colors = {
    orange: "from-court-orange to-amber-500",
    gold: "from-court-gold to-amber-300",
    cyan: "from-court-cyan to-sky-400",
    emerald: "from-court-emerald to-lime-400",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs text-muted-foreground font-athletic uppercase tracking-wider">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-metric font-bold text-white">{percentage}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-court-charcoal rounded-full overflow-hidden border border-court-border/40 p-0.5",
          sizes[size]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r relative overflow-hidden",
            colors[color]
          )}
        >
          {/* Shimmer highlight */}
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
