"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, Database, Server, Cpu } from "lucide-react";

export default function AdminPortalPage() {
  const systemFlags = [
    { name: "ADAPTIVE_PROGRAMMING", active: false, scope: "Engine" },
    { name: "AI_COACH", active: true, scope: "Explanation" },
    { name: "VIDEO_ANALYSIS", active: false, scope: "Camera Vision" },
    { name: "COACH_PORTAL", active: false, scope: "Team Roster" },
  ];

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="rose">Admin Control</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Role: ADMIN • Authoritative Engine
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              System Administration
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Feature flags, database schema migrations, and engine health status.
            </p>
          </div>
        </div>

        {/* Feature Flags Grid */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-court-orange" />
              <CardTitle className="text-xl">Runtime Feature Flags</CardTitle>
            </div>
            <CardDescription>Managed via FeatureFlagService & PostgreSQL source of truth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {systemFlags.map((flag) => (
                <div
                  key={flag.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-court-card border border-court-border text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-white block">{flag.name}</span>
                    <span className="text-[10px] text-muted-foreground">{flag.scope}</span>
                  </div>
                  <Badge variant={flag.active ? "emerald" : "outline"} size="sm">
                    {flag.active ? "ENABLED" : "DISABLED"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
