"use client";

import React from "react";
import Link from "next/link";
import { Layers, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export interface ProgramCardProps {
  programName: string;
  currentPhase: "FOUNDATION" | "STRENGTH_ELASTICITY" | "POWER_DEVELOPMENT" | "JUMP_EXPRESSION";
  currentWeek: number;
  totalWeeks?: number;
  adherencePercentage?: number;
  primaryAdaptationFocus: string;
  className?: string;
}

export function ProgramCard({
  programName,
  currentPhase,
  currentWeek,
  totalWeeks = 8,
  adherencePercentage = 0,
  primaryAdaptationFocus,
  className,
}: ProgramCardProps) {
  const phaseDisplayNames = {
    FOUNDATION: "Phase 1: Foundation & Tendon Stiffness",
    STRENGTH_ELASTICITY: "Phase 2: Strength & Kinetic Elasticity",
    POWER_DEVELOPMENT: "Phase 3: Rate of Force Development",
    JUMP_EXPRESSION: "Phase 4: Max Vertical Jump Expression",
  };

  const progress = Math.min(Math.max(Math.round((currentWeek / totalWeeks) * 100), 0), 100);

  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-court-charcoal/80 glass-panel border border-court-border relative overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">
            Deterministic Program
          </Badge>
          <h3 className="font-athletic text-2xl font-black text-white tracking-tight uppercase">
            {programName}
          </h3>
        </div>

        <span className="font-mono text-xs font-bold text-court-orange bg-court-card px-2.5 py-1 rounded-md border border-court-border">
          Week {currentWeek} of {totalWeeks}
        </span>
      </div>

      <div className="p-3 rounded-xl bg-court-card/60 border border-court-border/40 my-2 space-y-2">
        <span className="text-xs font-bold text-court-gold font-athletic uppercase block">
          {phaseDisplayNames[currentPhase] || currentPhase}
        </span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {primaryAdaptationFocus}
        </p>
      </div>

      <div className="space-y-3 my-2">
        <ProgressBar
          value={progress}
          color="gold"
          size="md"
          label={`Program Timeline (Week ${currentWeek}/${totalWeeks})`}
          showPercentage
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-court-border/40">
        <span className="font-metric">
          Adherence: <strong className="text-white">{adherencePercentage}%</strong>
        </span>

        <Link
          href="/program"
          className="text-court-orange hover:text-orange-400 font-bold font-athletic uppercase inline-flex items-center gap-1"
        >
          View 8-Week Schedule <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
