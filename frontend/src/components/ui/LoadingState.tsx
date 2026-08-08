import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Analyzing performance data...", className }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center space-y-4", className)}>
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-2 border-court-gold/20 border-t-court-gold animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-court-gold animate-ping" />
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
}
