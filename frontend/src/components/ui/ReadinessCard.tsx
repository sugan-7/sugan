"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Moon, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReadinessCardProps {
  score?: number | null; // 0 - 100
  category?: "OPTIMAL" | "READY" | "MODERATE" | "RECOVERY" | "FATIGUED";
  sleepHours?: number | null;
  sorenessScore?: number | null; // 1-10
  fatigueScore?: number | null; // 1-10
  className?: string;
  onLogClick?: () => void;
}

export function ReadinessCard({
  score,
  category,
  sleepHours,
  sorenessScore,
  fatigueScore,
  className,
  onLogClick,
}: ReadinessCardProps) {
  const hasData = score !== null && score !== undefined;

  const getScoreColor = (val: number) => {
    if (val >= 85) return { stroke: "#10B981", text: "text-emerald-400", bg: "from-emerald-950/40" };
    if (val >= 70) return { stroke: "#38BDF8", text: "text-sky-400", bg: "from-sky-950/40" };
    if (val >= 50) return { stroke: "#F59E0B", text: "text-amber-400", bg: "from-amber-950/40" };
    return { stroke: "#F43F5E", text: "text-rose-400", bg: "from-rose-950/40" };
  };

  const scoreStyle = hasData ? getScoreColor(score) : { stroke: "#232F46", text: "text-muted-foreground", bg: "from-court-card" };

  const circumference = 2 * Math.PI * 38; // r=38
  const strokeDashoffset = hasData ? circumference - (circumference * score) / 100 : circumference;

  return (
    <div
      className={cn(
        "rounded-2xl p-5 bg-court-charcoal/80 glass-panel border border-court-border relative overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-court-orange" />
          <span className="text-xs font-bold uppercase tracking-wider font-athletic text-foreground">
            Daily Readiness & Recovery
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-court-card text-muted-foreground border border-court-border">
          Non-clinical
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">
        {/* Circular Progress Gauge */}
        <div className="flex items-center justify-center relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="38"
              stroke="#171F30"
              strokeWidth="7"
              fill="transparent"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="38"
              stroke={scoreStyle.stroke}
              strokeWidth="7"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {hasData ? (
              <>
                <span className={cn("text-2xl font-black font-metric tracking-tight", scoreStyle.text)}>
                  {score}
                </span>
                <span className="text-[9px] font-athletic uppercase text-muted-foreground">
                  {category || "READINESS"}
                </span>
              </>
            ) : (
              <span className="text-xs font-bold text-muted-foreground font-athletic italic">
                --
              </span>
            )}
          </div>
        </div>

        {/* Readiness Breakdown */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-court-card/60 border border-court-border/40">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span>Sleep</span>
            </div>
            <span className="font-metric font-bold text-white">
              {sleepHours ? `${sleepHours} hrs` : "Not logged"}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-court-card/60 border border-court-border/40">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Soreness</span>
            </div>
            <span className="font-metric font-bold text-white">
              {sorenessScore ? `${sorenessScore}/10` : "Not logged"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-court-border/40">
        <span>Circadian & CNS load status</span>
        {onLogClick && (
          <button
            onClick={onLogClick}
            className="text-court-orange hover:text-orange-400 font-bold font-athletic uppercase hover:underline"
          >
            Log Daily Check-in →
          </button>
        )}
      </div>
    </div>
  );
}
