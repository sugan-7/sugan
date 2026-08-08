"use client";

import React from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface RetryStateProps {
  title?: string;
  description?: string;
  pendingCount?: number;
  onRetry: () => void;
  className?: string;
}

export function RetryState({
  title = "Workout Offline / Sync Pending",
  description = "Your sets are saved locally on this device. When internet connection is restored, synchronization will resume automatically.",
  pendingCount = 0,
  onRetry,
  className,
}: RetryStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-court-gold/40 p-6 bg-amber-950/20 text-center flex flex-col items-center justify-center space-y-3 glass-panel",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-court-gold/50 flex items-center justify-center text-court-gold">
        <WifiOff className="w-6 h-6" />
      </div>

      <div className="max-w-md space-y-1">
        <h4 className="text-base font-extrabold text-court-gold font-athletic uppercase">
          {title}
        </h4>
        <p className="text-xs text-amber-200/80 leading-relaxed">
          {description}
        </p>
      </div>

      {pendingCount > 0 && (
        <span className="text-[11px] font-mono font-bold text-court-gold bg-amber-900/40 px-2.5 py-0.5 rounded border border-amber-700/40">
          {pendingCount} Pending Local Sets Queued
        </span>
      )}

      <div className="pt-2">
        <Button
          variant="gold"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Sync Now
        </Button>
      </div>
    </div>
  );
}
