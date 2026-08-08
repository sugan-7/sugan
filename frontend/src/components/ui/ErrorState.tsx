"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  correlationId?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Failed to load data",
  message = "An unexpected error occurred while communicating with the performance engine.",
  correlationId,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-rose-500/40 p-6 sm:p-8 bg-rose-950/20 text-center flex flex-col items-center justify-center space-y-3 glass-panel",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-center text-rose-400">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="max-w-md space-y-1">
        <h4 className="text-base font-extrabold text-rose-300 font-athletic uppercase">
          {title}
        </h4>
        <p className="text-xs text-rose-200/80 leading-relaxed">
          {message}
        </p>
      </div>

      {correlationId && (
        <div className="text-[10px] font-mono text-rose-300/70 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800/40">
          Trace ID: {correlationId}
        </div>
      )}

      {onRetry && (
        <div className="pt-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}
