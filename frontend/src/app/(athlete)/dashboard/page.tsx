"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Flame,
  Dumbbell,
  Target,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  FileText,
  Calendar,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { WorkoutCard } from "@/components/ui/WorkoutCard";
import { ReadinessCard } from "@/components/ui/ReadinessCard";
import { GoalCard } from "@/components/ui/GoalCard";
import { ProgressChart } from "@/components/ui/ProgressChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AthleteDashboardPage() {
  const [athleteName, setAthleteName] = useState("Stephen Curry");
  const [standingVertical, setStandingVertical] = useState<number | null>(72.0);
  const [personalBest, setPersonalBest] = useState<number | null>(75.5);
  const [targetVertical, setTargetVertical] = useState<number | null>(85.0);
  const [baselineChange, setBaselineChange] = useState<string>("+3.5 cm");
  const [goalGap, setGoalGap] = useState<number | null>(13.0);
  const [streakDays, setStreakDays] = useState<number>(4);
  const [readinessScore, setReadinessScore] = useState<number | null>(88);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("vertex_user_name");
      if (storedName) setAthleteName(storedName);

      const storedVert = localStorage.getItem("vertex_standing_vertical");
      if (storedVert) setStandingVertical(parseFloat(storedVert));

      const storedTarget = localStorage.getItem("vertex_target_vertical");
      if (storedTarget) setTargetVertical(parseFloat(storedTarget));
    }
  }, []);

  const sampleTrajectoryData = [
    { date: "Baseline", vertical: 68.5 },
    { date: "Week 1", vertical: 69.0 },
    { date: "Week 2", vertical: 70.2 },
    { date: "Week 3", vertical: 71.0 },
    { date: "Current", vertical: standingVertical || 72.0 },
  ];

  return (
    <AppShell
      athleteName={athleteName}
      streakDays={streakDays}
      readinessScore={readinessScore}
    >
      <div className="space-y-8">
        {/* DASHBOARD GREETING & STATUS BANNER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="orange">Athlete Performance Lab</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                UTC Synchronized • Localized Display
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Welcome back, {athleteName.split(" ")[0]}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Phase 1: Foundation & Tendon Stiffness • Day 12 of 56
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/jump-lab">
              <Button variant="outline" size="sm" leftIcon={<Activity className="w-3.5 h-3.5" />}>
                Open Jump Lab
              </Button>
            </Link>
            <Link href="/workout">
              <Button variant="primary" size="sm" className="shadow-glow-orange" leftIcon={<Dumbbell className="w-3.5 h-3.5" />}>
                Start Today&apos;s Workout
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 HERO METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Current Standing Vertical"
            value={standingVertical}
            unit="cm"
            statusLabel="Verified Test"
            subtext="Baseline change: +3.5 cm"
            trend="up"
            trendValue="+3.5 cm"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Personal Best (PB)"
            value={personalBest}
            unit="cm"
            statusLabel="Historical Record"
            subtext="From verified test log"
            isPersonalBest={true}
          />
          <MetricCard
            label="Target Goal Vertical"
            value={targetVertical}
            unit="cm"
            statusLabel="Rim Attack Goal"
            subtext="Target vertical height"
            isPlatformDerived={true}
          />
          <MetricCard
            label="Remaining Goal Gap"
            value={goalGap}
            unit="cm"
            statusLabel="Delta"
            subtext="Distance to primary goal"
            trend="down"
            trendValue="-1.5 cm this month"
            isPlatformDerived={true}
          />
        </div>

        {/* WORKOUT & RECOVERY ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Prescribed Session */}
          <div className="lg:col-span-2">
            <WorkoutCard
              id="w-101"
              title="Phase 1 • Day 12: Tendon Stiffness & SSC"
              phaseName="Foundation Phase"
              dayNumber={12}
              totalExercises={5}
              estimatedMinutes={42}
              status="SCHEDULED"
              targetFocus="Pogo hops, isometric split squats, seated calf raises, and deceleration mechanics."
            />
          </div>

          {/* Daily Recovery & CNS Readiness */}
          <div>
            <ReadinessCard
              score={readinessScore}
              category="OPTIMAL"
              sleepHours={8.2}
              sorenessScore={2}
              fatigueScore={3}
            />
          </div>
        </div>

        {/* GOALS & TRAJECTORY ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Goal Card */}
          <div>
            <GoalCard
              primaryGoalName="First In-Game Dunk (10ft Rim)"
              targetVerticalCm={targetVertical}
              currentVerticalCm={standingVertical}
              baselineVerticalCm={68.5}
              targetDate="Week 8 Peak"
            />
          </div>

          {/* Progress Trajectory Chart */}
          <div className="lg:col-span-2">
            <ProgressChart
              data={sampleTrajectoryData}
              dataKey="vertical"
              color="orange"
              title="Vertical Jump Trajectory"
              unit="cm"
              height={220}
            />
          </div>
        </div>

        {/* AI COACH INSIGHT & WEEKLY REPORT PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="interactive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-court-gold" />
                <CardTitle className="text-xl">AI Coach Insight</CardTitle>
              </div>
              <Badge variant="gold" size="sm">
                Deterministic
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                &ldquo;Your tendon elasticity adaptation is progressing smoothly (+3.5 cm from baseline). Today&apos;s workout focuses on Achilles stiffness. Keep ground contact time short on all pogo hops.&rdquo;
              </p>
              <Link
                href="/ai-coach"
                className="text-court-orange hover:text-orange-400 font-bold font-athletic uppercase text-xs inline-flex items-center gap-1"
              >
                Open AI Coach Insights <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-court-cyan" />
                <CardTitle className="text-xl">Weekly Performance Summary</CardTitle>
              </div>
              <Badge variant="cyan" size="sm">
                Week 2 Synthesized
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center my-1 p-2.5 rounded-xl bg-court-card border border-court-border text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground font-athletic uppercase block">Adherence</span>
                  <span className="font-metric font-black text-white">100%</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-athletic uppercase block">Avg RPE</span>
                  <span className="font-metric font-black text-court-gold">6.8 / 10</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-athletic uppercase block">Volume</span>
                  <span className="font-metric font-black text-emerald-400">12 Sets</span>
                </div>
              </div>
              <Link
                href="/weekly-report"
                className="text-court-cyan hover:text-sky-300 font-bold font-athletic uppercase text-xs inline-flex items-center gap-1 mt-3"
              >
                View Full Weekly Report <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
