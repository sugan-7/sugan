"use client";

import React from "react";
import { FolderX, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title = "Insufficient data",
  description = "No logs or records have been established for this metric yet.",
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-court-border/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 bg-court-charcoal/40 glass-panel",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-court-card border border-court-border flex items-center justify-center text-muted-foreground shadow-sm">
        {icon || <FolderX className="w-6 h-6 text-court-orange/80" />}
      </div>

      <div className="max-w-md space-y-1">
        <h4 className="text-base font-extrabold text-foreground font-athletic uppercase tracking-tight">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction} leftIcon={<PlusCircle className="w-3.5 h-3.5" />}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
