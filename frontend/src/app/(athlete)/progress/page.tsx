"use client";

import React from "react";
import { BarChart3, TrendingUp, Calendar, Trophy, Activity, Target } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressChart } from "@/components/ui/ProgressChart";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ProgressPage() {
  const jumpHistory = [
    { date: "Baseline", vertical: 68.5 },
    { date: "Week 1", vertical: 69.2 },
    { date: "Week 2", vertical: 70.5 },
    { date: "Week 3", vertical: 71.0 },
    { date: "Week 4", vertical: 72.0 },
  ];

  const volumeHistory = [
    { date: "Week 1", vertical: 120 },
    { date: "Week 2", vertical: 145 },
    { date: "Week 3", vertical: 160 },
    { date: "Week 4", vertical: 130 }, // Deload
  ];

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="emerald">Analytics Hub</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Historical Adaptation Slopes
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Progress Analytics
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Visual trajectories of vertical jump height, training volume, and neuromuscular recovery.
            </p>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Baseline to Date Gain"
            value="+3.5"
            unit="cm"
            statusLabel="Vertical Slope"
            subtext="From 68.5 cm baseline"
            trend="up"
            trendValue="+1.1 cm / wk"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Program Adherence"
            value="94%"
            statusLabel="Consistency"
            subtext="16 of 17 sessions completed"
            trend="up"
            trendValue="High"
            isPlatformDerived={true}
          />
          <MetricCard
            label="Total Jump Touches"
            value="340"
            statusLabel="Tendon Contacts"
            subtext="Controlled plyometric volume"
            isPlatformDerived={true}
          />
          <MetricCard
            label="Average Session RPE"
            value="7.2"
            unit="/10"
            statusLabel="Intensity"
            subtext="Balanced power zone"
            isPlatformDerived={true}
          />
        </div>

        {/* 2 Recharts Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart
            data={jumpHistory}
            dataKey="vertical"
            color="orange"
            title="Standing Vertical Progress Trajectory"
            unit="cm"
            height={260}
          />

          <ProgressChart
            data={volumeHistory}
            dataKey="vertical"
            color="cyan"
            title="Weekly Plyometric Contact Volume"
            unit="contacts"
            height={260}
          />
        </div>

        {/* Weekly Adherence Grid */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-xl">8-Week Cycle Adherence Heatmap</CardTitle>
            <CardDescription>Visual record of completed court sessions and rest days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[
                { week: "W1", done: 4, target: 4 },
                { week: "W2", done: 4, target: 4 },
                { week: "W3", done: 4, target: 4 },
                { week: "W4", done: 4, target: 4 },
                { week: "W5", done: 0, target: 4, active: true },
                { week: "W6", done: 0, target: 4 },
                { week: "W7", done: 0, target: 4 },
                { week: "W8", done: 0, target: 4 },
              ].map((w) => (
                <div
                  key={w.week}
                  className={`p-3 rounded-xl border text-center text-xs font-athletic uppercase ${
                    w.active
                      ? "bg-court-orange/20 border-court-orange text-court-orange shadow-glow-orange font-bold"
                      : w.done > 0
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-bold"
                      : "bg-court-card border-court-border text-muted-foreground"
                  }`}
                >
                  <span className="block text-sm font-black">{w.week}</span>
                  <span className="text-[10px] font-mono">
                    {w.done}/{w.target}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
