"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StreakIndicatorProps {
  streakDays: number;
  bestStreak?: number;
  className?: string;
}

export function StreakIndicator({
  streakDays,
  bestStreak,
  className,
}: StreakIndicatorProps) {
  const isActive = streakDays > 0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all glass-panel",
        isActive
          ? "border-court-orange/50 bg-court-orange/10 shadow-glow-orange text-court-orange"
          : "border-court-border bg-court-card text-muted-foreground",
        className
      )}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative"
      >
        <Flame className={cn("w-4 h-4", isActive ? "fill-court-orange text-court-orange" : "text-muted-foreground")} />
      </motion.div>

      <div className="flex items-baseline gap-1 font-athletic">
        <span className="text-sm font-black font-metric text-white">
          {streakDays}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {streakDays === 1 ? "Day Streak" : "Days Streak"}
        </span>
      </div>

      {bestStreak && bestStreak > streakDays && (
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground/80 pl-1.5 border-l border-court-border">
          <Trophy className="w-3 h-3 text-court-gold" /> Best: {bestStreak}d
        </span>
      )}
    </div>
  );
}
