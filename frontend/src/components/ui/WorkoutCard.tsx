"use client";

import React from "react";
import Link from "next/link";
import { Play, CheckCircle2, Clock, Dumbbell, Calendar } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export interface WorkoutCardProps {
  id: string;
  title: string;
  phaseName: string;
  dayNumber: number;
  totalExercises: number;
  estimatedMinutes: number;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";
  targetFocus: string;
  className?: string;
  onStartClick?: () => void;
}

export function WorkoutCard({
  id,
  title,
  phaseName,
  dayNumber,
  totalExercises,
  estimatedMinutes,
  status,
  targetFocus,
  className,
  onStartClick,
}: WorkoutCardProps) {
  const isCompleted = status === "COMPLETED";
  const isInProgress = status === "IN_PROGRESS";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-court-charcoal/80 glass-panel border transition-all duration-200 flex flex-col justify-between relative overflow-hidden",
        isCompleted
          ? "border-emerald-500/40 bg-emerald-950/10 shadow-glow-emerald"
          : "border-court-border hover:border-court-orange/50 hover:shadow-glow-orange",
        className
      )}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="orange" size="sm">
            {phaseName}
          </Badge>
          <span className="text-xs font-mono text-muted-foreground font-bold">
            Day {dayNumber}
          </span>
        </div>

        {isCompleted ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 font-athletic">
            <CheckCircle2 className="w-4 h-4" /> COMPLETED
          </span>
        ) : isInProgress ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-court-orange font-athletic animate-pulse">
            ● IN PROGRESS
          </span>
        ) : (
          <Badge variant="secondary" size="sm">
            SCHEDULED
          </Badge>
        )}
      </div>

      {/* Main Title & Focus */}
      <div className="mb-4">
        <h3 className="font-athletic text-2xl font-black text-white tracking-tight uppercase mb-1">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {targetFocus}
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-court-card/60 border border-court-border/40 text-xs mb-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-court-orange" />
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-athletic block">Volume</span>
            <span className="font-metric font-bold text-white">{totalExercises} Exercises</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-athletic block">Estimated Time</span>
            <span className="font-metric font-bold text-white">{estimatedMinutes} min</span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="pt-2">
        {isCompleted ? (
          <Link href={`/workout`}>
            <Button variant="outline" size="md" className="w-full">
              Review Session Log
            </Button>
          </Link>
        ) : (
          <Link href={`/workout`}>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={onStartClick}
              leftIcon={<Play className="w-4 h-4 fill-white mr-1" />}
            >
              {isInProgress ? "Resume Workout" : "Start Today's Workout"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
