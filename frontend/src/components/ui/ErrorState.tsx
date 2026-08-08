import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Unable to load data",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-destructive/30 p-8 text-center flex flex-col items-center justify-center space-y-3 bg-destructive/5",
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold">
        ✕
      </div>
      <h4 className="text-base font-bold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </div>
  );
}
