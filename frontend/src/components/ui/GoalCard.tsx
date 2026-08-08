"use client";

import React from "react";
import { Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

export interface GoalCardProps {
  primaryGoalName: string; // e.g. "Touch Rim (10ft)", "First In-Game Dunk", "+15cm Vertical"
  targetVerticalCm?: number | null;
  currentVerticalCm?: number | null;
  baselineVerticalCm?: number | null;
  targetDate?: string;
  className?: string;
}

export function GoalCard({
  primaryGoalName,
  targetVerticalCm,
  currentVerticalCm,
  baselineVerticalCm,
  targetDate,
  className,
}: GoalCardProps) {
  const hasData = targetVerticalCm && currentVerticalCm && baselineVerticalCm;

  let progress = 0;
  let goalGap = 0;

  if (hasData) {
    const totalTargetGain = targetVerticalCm - baselineVerticalCm;
    const currentGain = currentVerticalCm - baselineVerticalCm;
    progress = totalTargetGain > 0 ? Math.min(Math.max((currentGain / totalTargetGain) * 100, 0), 100) : 0;
    goalGap = Math.max(targetVerticalCm - currentVerticalCm, 0);
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-5 bg-court-charcoal/80 glass-panel border border-court-border relative overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-court-orange/15 border border-court-orange/30 flex items-center justify-center text-court-orange">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-athletic block">
              Primary Athlete Goal
            </span>
            <h4 className="text-base font-extrabold text-white font-athletic uppercase">
              {primaryGoalName}
            </h4>
          </div>
        </div>

        {hasData && (
          <span className="text-xs font-mono font-bold text-court-orange bg-court-card px-2 py-1 rounded-md border border-court-border">
            {goalGap > 0 ? `${goalGap.toFixed(1)} cm to go` : "Goal Achieved!"}
          </span>
        )}
      </div>

      {hasData ? (
        <div className="space-y-3 my-2">
          <div className="flex items-center justify-between text-xs font-metric">
            <span className="text-muted-foreground">
              Baseline: <strong className="text-white">{baselineVerticalCm} cm</strong>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-court-cyan">
              Current: <strong className="text-white">{currentVerticalCm} cm</strong>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-court-gold">
              Target: <strong className="text-white">{targetVerticalCm} cm</strong>
            </span>
          </div>

          <ProgressBar value={progress} color="orange" size="md" showPercentage label="Goal Progress" />
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-court-card/50 border border-court-border/40 text-center my-2">
          <p className="text-xs text-muted-foreground">
            Complete baseline jump assessment to calculate your exact goal gap and trajectory.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-court-border/40">
        <span>Deterministic target gap</span>
        {targetDate && <span className="font-mono">Target: {targetDate}</span>}
      </div>
    </div>
  );
}
