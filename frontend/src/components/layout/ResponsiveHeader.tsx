"use client";

import React from "react";
import Link from "next/link";
import { Bell, ShieldCheck, User, Menu } from "lucide-react";
import { StreakIndicator } from "../ui/StreakIndicator";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export interface ResponsiveHeaderProps {
  athleteName?: string;
  streakDays?: number;
  readinessScore?: number | null;
  onMobileMenuToggle?: () => void;
}

export function ResponsiveHeader({
  athleteName = "Athlete",
  streakDays = 0,
  readinessScore = null,
  onMobileMenuToggle,
}: ResponsiveHeaderProps) {
  return (
    <header className="h-16 border-b border-court-border/80 bg-court-dark/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
      {/* Left side mobile toggle + breadcrumb */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl bg-court-card text-muted-foreground hover:text-white border border-court-border"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-athletic uppercase font-bold text-muted-foreground hidden sm:inline">
            Status:
          </span>
          <Badge variant="orange" size="sm">
            Deterministic v2.1
          </Badge>
        </div>
      </div>

      {/* Right side status items */}
      <div className="flex items-center gap-3">
        <StreakIndicator streakDays={streakDays} />

        {readinessScore !== null && readinessScore !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-court-card border border-court-border text-xs font-athletic uppercase">
            <span className="text-muted-foreground">Readiness:</span>
            <span className="font-metric font-bold text-emerald-400">
              {readinessScore}%
            </span>
          </div>
        )}

        <Link href="/settings" className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-court-card transition-colors border border-transparent hover:border-court-border">
          <div className="w-8 h-8 rounded-lg bg-court-card border border-court-border flex items-center justify-center text-court-orange font-bold font-athletic">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden lg:inline text-xs font-athletic uppercase font-bold text-foreground">
            {athleteName}
          </span>
        </Link>
      </div>
    </header>
  );
}
