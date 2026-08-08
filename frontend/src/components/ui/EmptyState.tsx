import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Insufficient data",
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border/80 p-8 text-center flex flex-col items-center justify-center space-y-3 bg-secondary/20",
        className
      )}
    >
      {icon ? (
        <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground mb-1">
          {icon}
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-court-gold font-bold font-mono">
          !
        </div>
      )}
      <h4 className="text-base font-bold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
