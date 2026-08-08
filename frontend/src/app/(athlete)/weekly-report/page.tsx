"use client";

import React from "react";
import { FileText, Download, TrendingUp, CheckCircle2, Award, Calendar } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressChart } from "@/components/ui/ProgressChart";

export default function WeeklyReportPage() {
  const weeklyData = [
    { date: "Mon", vertical: 70.0 },
    { date: "Tue", vertical: 70.5 },
    { date: "Thu", vertical: 71.0 },
    { date: "Sat", vertical: 72.0 },
  ];

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="cyan">Synthesized Progress</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Week 2 Completed
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Weekly Performance Report
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Automated synthesis of vertical gains, training volume, RPE load, and neuromuscular adaptation.
            </p>
          </div>

          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export PDF
          </Button>
        </div>

        {/* 3 Executive Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-court-charcoal/80 glass-panel border border-court-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-athletic block">
              7-Day Vertical Gain
            </span>
            <span className="text-3xl font-metric font-black text-emerald-400">
              +1.5 cm
            </span>
            <span className="text-[10px] text-muted-foreground block mt-1">
              From 70.5 cm to 72.0 cm
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-court-charcoal/80 glass-panel border border-court-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-athletic block">
              Session Adherence
            </span>
            <span className="text-3xl font-metric font-black text-court-gold">
              4 / 4 Days
            </span>
            <span className="text-[10px] text-muted-foreground block mt-1">
              100% On-Schedule
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-court-charcoal/80 glass-panel border border-court-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-athletic block">
              Average Fatigue Rating
            </span>
            <span className="text-3xl font-metric font-black text-sky-400">
              6.8 / 10
            </span>
            <span className="text-[10px] text-muted-foreground block mt-1">
              Controlled CNS fatigue
            </span>
          </div>
        </div>

        {/* Weekly Chart */}
        <ProgressChart
          data={weeklyData}
          dataKey="vertical"
          color="emerald"
          title="Week 2 Jump Session Progression"
          unit="cm"
          height={220}
        />

        {/* Narrative Summary */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-xl">Biomechanical Coach Summary</CardTitle>
            <CardDescription>Generated for Stephen Curry • Phase 1 Review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              &ldquo;Throughout Week 2, your standing reach was maintained at 242.0 cm while standing touch progressed to 314.0 cm (+3.5 cm total from baseline). The introduction of seated calf raises and isometric split squats significantly increased lower-extremity tendon stiffness without triggering patellar joint soreness.&rdquo;
            </p>
            <p>
              &ldquo;Next week begins Week 3: Transition to Strength &amp; Kinetic Elasticity with accelerated trap bar deadlifts.&rdquo;
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
