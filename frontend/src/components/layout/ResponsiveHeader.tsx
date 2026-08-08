"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ShieldCheck, User, Menu, LogOut } from "lucide-react";
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
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("vertex_user_email");
      localStorage.removeItem("vertex_auth_token");
      sessionStorage.clear();
    }
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-court-border/80 bg-court-dark/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
      {/* Left side mobile toggle + status */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl bg-court-card text-muted-foreground hover:text-white border border-court-border"
            aria-label="Toggle navigation menu"
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

      {/* Right side status items & Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        <StreakIndicator streakDays={streakDays} />

        {readinessScore !== null && readinessScore !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-court-card border border-court-border text-xs font-athletic uppercase">
            <span className="text-muted-foreground">Readiness:</span>
            <span className="font-metric font-bold text-emerald-400">
              {readinessScore}%
            </span>
          </div>
        )}

        <Link
          href="/settings"
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-court-card transition-colors border border-transparent hover:border-court-border"
          title="Athlete Profile & Settings"
        >
          <div className="w-8 h-8 rounded-lg bg-court-card border border-court-border flex items-center justify-center text-court-orange font-bold font-athletic">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden lg:inline text-xs font-athletic uppercase font-bold text-foreground">
            {athleteName}
          </span>
        </Link>

        {/* Dedicated Top-Bar Log Out Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-court-card hover:bg-rose-950/50 border border-court-border hover:border-rose-500/50 text-muted-foreground hover:text-rose-300 text-xs font-athletic uppercase font-bold transition-all duration-150 shadow-sm"
          title="Log Out of VERTEX"
          aria-label="Log Out of VERTEX"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
}
