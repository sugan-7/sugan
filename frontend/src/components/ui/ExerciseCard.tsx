"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, Dumbbell, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export interface ExerciseCardProps {
  id: string;
  name: string;
  category: "PLYOMETRIC" | "STRENGTH" | "ISOMETRIC" | "HYPERTROPHY" | "MOBILITY" | "POTENTIATION";
  movementPattern?: string;
  targetSets: number;
  targetReps: string;
  loadGuidance?: string;
  coachingCue?: string;
  equipment?: string[];
  isCompleted?: boolean;
  videoAvailable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ExerciseCard({
  id,
  name,
  category,
  movementPattern,
  targetSets,
  targetReps,
  loadGuidance,
  coachingCue,
  equipment = [],
  isCompleted = false,
  videoAvailable = false,
  className,
  onClick,
}: ExerciseCardProps) {
  const categoryVariants = {
    PLYOMETRIC: "orange",
    STRENGTH: "gold",
    ISOMETRIC: "cyan",
    HYPERTROPHY: "purple",
    MOBILITY: "emerald",
    POTENTIATION: "primary",
  } as const;

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-4 bg-court-charcoal/80 glass-panel border transition-all duration-200 flex flex-col justify-between group",
        isCompleted
          ? "border-emerald-500/40 bg-emerald-950/10 shadow-glow-emerald"
          : "border-court-border hover:border-court-orange/50 hover:shadow-glow-orange",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={categoryVariants[category] || "secondary"} size="sm">
              {category}
            </Badge>
            {movementPattern && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {movementPattern}
              </span>
            )}
          </div>
          <h4 className="font-athletic text-lg font-bold text-white group-hover:text-court-orangeLight transition-colors">
            {name}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {videoAvailable ? (
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-court-card text-sky-300 border border-sky-400/30 font-bold font-athletic">
              <PlayCircle className="w-3 h-3 text-sky-400" /> Video
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-court-card text-muted-foreground border border-court-border">
              Cue Only
            </span>
          )}

          {isCompleted && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
        </div>
      </div>

      {/* Prescription parameters */}
      <div className="grid grid-cols-2 gap-2 my-2 p-2.5 rounded-xl bg-court-card/60 border border-court-border/40 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground font-athletic block">
            Target Volume
          </span>
          <span className="font-metric font-extrabold text-white text-sm">
            {targetSets} sets × {targetReps}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground font-athletic block">
            Load Guidance
          </span>
          <span className="font-athletic font-bold text-court-gold text-xs truncate block">
            {loadGuidance || "Bodyweight / Explosive"}
          </span>
        </div>
      </div>

      {coachingCue && (
        <div className="text-xs text-muted-foreground italic bg-court-card/30 p-2 rounded-lg border-l-2 border-court-orange mb-2">
          "{coachingCue}"
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-court-border/40">
        <div className="flex items-center gap-1 truncate max-w-[200px]">
          <Dumbbell className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="truncate">{equipment.length > 0 ? equipment.join(", ") : "No equipment required"}</span>
        </div>

        <Link
          href={`/exercises`}
          className="text-court-orange hover:text-orange-400 font-bold font-athletic uppercase inline-flex items-center gap-0.5"
        >
          Details <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
