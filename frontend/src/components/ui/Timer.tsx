"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Plus, Volume2 } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface TimerProps {
  initialSeconds?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function Timer({
  initialSeconds = 60,
  autoStart = false,
  onComplete,
  className,
}: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            if (typeof window !== "undefined" && "vibrate" in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining, onComplete]);

  const addTime = (secs: number) => {
    setRemaining((prev) => prev + secs);
    setTotalSeconds((prev) => Math.max(prev, remaining + secs));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemaining(totalSeconds);
  };

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;

  return (
    <div
      className={cn(
        "rounded-2xl p-5 bg-court-charcoal/90 glass-panel border border-court-border flex flex-col items-center justify-between text-center relative overflow-hidden",
        remaining === 0 && "border-emerald-500/60 shadow-glow-emerald bg-emerald-950/20",
        className
      )}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xs font-bold uppercase tracking-wider font-athletic text-muted-foreground">
          Rest Interval Timer
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-court-card text-muted-foreground border border-court-border">
          {totalSeconds}s Target
        </span>
      </div>

      {/* Large Digital Display */}
      <div className="my-3">
        <span
          className={cn(
            "text-5xl sm:text-6xl font-black font-metric tracking-tight",
            remaining === 0 ? "text-emerald-400" : remaining < 10 ? "text-court-orange animate-pulse" : "text-white"
          )}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-2 mt-2 w-full justify-center">
        <Button
          variant={isRunning ? "secondary" : "primary"}
          size="sm"
          onClick={() => setIsRunning(!isRunning)}
          leftIcon={isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        >
          {isRunning ? "Pause" : remaining === 0 ? "Restart" : "Start"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => addTime(15)}
          leftIcon={<Plus className="w-3 h-3" />}
        >
          +15s
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetTimer}
          aria-label="Reset Timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
