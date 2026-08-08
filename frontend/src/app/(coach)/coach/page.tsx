"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, Sparkles, ShieldCheck } from "lucide-react";

export default function CoachPortalPage() {
  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="purple">Coach & Team Portal</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Role: COACH • Feature-Flagged
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Coach Performance Roster
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Multi-athlete team monitoring, jump baseline tracking, and workload management.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-court-charcoal/80 border border-purple-500/30 glass-panel text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="font-athletic text-2xl font-black text-white uppercase">
            Coach Team Dashboard
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Team roster views and group jump assessment logs will be unlocked in Phase 3. Currently in early foundation preview.
          </p>
          <Badge variant="outline">Flag: COACH_PORTAL (Active in Phase 3)</Badge>
        </div>
      </div>
    </AppShell>
  );
}
