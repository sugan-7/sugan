"use client";

import React, { useState } from "react";
import { Target, PlusCircle, Trophy, CheckCircle2, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GoalCard } from "@/components/ui/GoalCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function GoalsPage() {
  const [targetVertical, setTargetVertical] = useState(85.0);
  const [currentVertical, setCurrentVertical] = useState(72.0);
  const [baselineVertical, setBaselineVertical] = useState(68.5);

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="gold">Milestone Targets</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Deterministic Goal Gap
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Athletic Goals & Rim Milestones
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Track your distance to rim contact, in-game dunks, and approach speed conversion.
            </p>
          </div>
        </div>

        {/* Primary Goal Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GoalCard
            primaryGoalName="First In-Game Dunk (10ft Rim)"
            targetVerticalCm={targetVertical}
            currentVerticalCm={currentVertical}
            baselineVerticalCm={baselineVertical}
            targetDate="Week 8 Peak"
          />

          {/* Secondary Goal Card */}
          <GoalCard
            primaryGoalName="Rim Hang & Rebound Dominance"
            targetVerticalCm={80.0}
            currentVerticalCm={currentVertical}
            baselineVerticalCm={baselineVertical}
            targetDate="Week 6 Expression"
          />
        </div>

        {/* Goal Trajectory Roadmap */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-xl">Vertical Milestone Roadmap</CardTitle>
            <CardDescription>Mathematical touch benchmarks from 305 cm standard rim</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Net Touch (290 cm)", achieved: true, date: "Baseline Test" },
              { title: "Backboard Slap (300 cm)", achieved: true, date: "Week 2 Log" },
              { title: "Rim Grazing (305 cm)", achieved: false, date: "Estimated Week 5" },
              { title: "Two-Hand Rim Hang (315 cm)", achieved: false, date: "Estimated Week 7" },
              { title: "First Flush Dunk (325 cm)", achieved: false, date: "Estimated Week 8" },
            ].map((m) => (
              <div
                key={m.title}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                  m.achieved
                    ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                    : "bg-court-card border-court-border text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {m.achieved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Target className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-athletic font-bold uppercase text-white">
                    {m.title}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">{m.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
