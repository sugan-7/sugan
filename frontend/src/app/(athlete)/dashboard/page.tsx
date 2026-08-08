import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AthleteDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-8">
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Athlete Portal</Badge>
              <span className="text-xs font-mono text-muted-foreground">UTC-Stored • Localized Display</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
              Athlete Performance Lab
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Welcome back. Review your baseline measurements, current training phase, and recovery status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/jump-lab">
              <Button variant="outline" size="sm">
                Open Jump Lab
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary" size="sm">
                Complete Assessment
              </Button>
            </Link>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Current Standing Vertical"
            value={null}
            unit="cm"
            statusLabel="Jump Test"
            subtext="Baseline change: --"
          />
          <MetricCard
            label="Personal Best (PB)"
            value={null}
            unit="cm"
            statusLabel="Verified Historical"
            subtext="From stored test logs"
          />
          <MetricCard
            label="Approach Advantage"
            value={null}
            unit="cm"
            statusLabel="Kinetic Elasticity"
            subtext="Approach - Standing"
          />
          <MetricCard
            label="Goal Gap"
            value={null}
            unit="cm"
            statusLabel="Rim / Target Reach"
            subtext="Target vertical distance"
          />
        </div>

        {/* WORKOUT & RECOVERY ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Workout */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Prescribed Session</CardTitle>
                <CardDescription>Deterministic Training Engine prescription</CardDescription>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Insufficient data for program generation"
                description="Complete your onboarding assessment and manual jump test to generate your personalized 8-week program."
                actionLabel="Start Assessment Flow"
              />
            </CardContent>
          </Card>

          {/* Daily Recovery & Readiness */}
          <Card>
            <CardHeader>
              <CardTitle>Recovery & Readiness</CardTitle>
              <CardDescription>Internal platform indicator (non-clinical)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/60 text-center">
                <span className="text-xs uppercase font-semibold text-muted-foreground block mb-1">
                  Readiness Score
                </span>
                <span className="text-2xl font-mono font-bold text-muted-foreground italic">
                  Unavailable
                </span>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Daily sleep duration, soreness, and fatigue logs required to calculate internal readiness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI COACH INSIGHTS & REPORTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Coach Insight</CardTitle>
                <Badge variant="secondary">Constrained Explanation</Badge>
              </div>
              <CardDescription>Deterministic program rationale & trend summary</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Insufficient data"
                description="The AI Coach provides explainable summaries once training logs and jump test histories are recorded."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Performance Report</CardTitle>
                <Badge variant="secondary">Weekly Summary</Badge>
              </div>
              <CardDescription>Synthesized vertical, strength, and adherence progress</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Insufficient data"
                description="Weekly progress reports are generated at the end of each 7-day training block."
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
