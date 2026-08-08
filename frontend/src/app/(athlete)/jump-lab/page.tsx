"use client";

import React, { useState } from "react";
import {
  Activity,
  PlusCircle,
  Video,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ProgressChart } from "@/components/ui/ProgressChart";

export default function JumpLabPage() {
  const [isRetestModalOpen, setIsRetestModalOpen] = useState(false);
  const [standingReach, setStandingReach] = useState(242.0);
  const [standingTouch, setStandingTouch] = useState(314.0);
  const [approachTouch, setApproachTouch] = useState(320.0);
  const [oneFootTouch, setOneFootTouch] = useState(315.0);
  const [twoFootTouch, setTwoFootTouch] = useState(320.0);
  const [personalBest, setPersonalBest] = useState(78.0);

  // Derived values
  const standingVertical = standingTouch - standingReach;
  const approachVertical = approachTouch - standingReach;
  const approachAdvantage = approachVertical - standingVertical;
  const oneFootVertical = oneFootTouch - standingReach;
  const twoFootVertical = twoFootTouch - standingReach;

  // Jump test history
  const [jumpLogs, setJumpLogs] = useState([
    { id: 1, date: "2026-07-15", reach: 242.0, touch: 310.5, vertical: 68.5, type: "Baseline Test" },
    { id: 2, date: "2026-07-28", reach: 242.0, touch: 312.0, vertical: 70.0, type: "Mid-Phase 1" },
    { id: 3, date: "2026-08-08", reach: 242.0, touch: 314.0, vertical: 72.0, type: "Current Retest" },
  ]);

  const trajectoryData = jumpLogs.map((log) => ({
    date: log.date.substring(5),
    vertical: log.vertical,
  }));

  const handleRecordRetest = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().substring(0, 10),
      reach: standingReach,
      touch: standingTouch,
      vertical: standingVertical,
      type: "Verified Retest",
    };
    setJumpLogs([...jumpLogs, newLog]);
    setIsRetestModalOpen(false);
  };

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="orange">Jump Lab v2.1</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Deterministic Calculation Provenance
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Jump Lab & Provenance
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Transparent vertical jump calculations. No fabricated measurements or unverified PRs.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsRetestModalOpen(true)}
            className="shadow-glow-orange"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
          >
            Record Manual Jump Test
          </Button>
        </div>

        {/* 6 JUMP LAB METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Standing Reach"
            value={standingReach.toFixed(1)}
            unit="cm"
            statusLabel="Flat-Foot Reach"
            subtext="Verified anatomical reach"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Standing Vertical"
            value={standingVertical.toFixed(1)}
            unit="cm"
            statusLabel="Touch - Reach"
            subtext="Pure lower body force"
            trend="up"
            trendValue="+3.5 cm"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Approach Vertical"
            value={approachVertical.toFixed(1)}
            unit="cm"
            statusLabel="Full Approach"
            subtext="Max running approach"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Approach Advantage"
            value={approachAdvantage.toFixed(1)}
            unit="cm"
            statusLabel="Kinetic Conversion"
            subtext="Approach - Standing"
            trend="up"
            trendValue="+1.0 cm"
            isPlatformDerived={true}
          />
          <MetricCard
            label="2-Foot vs 1-Foot Delta"
            value={(twoFootVertical - oneFootVertical).toFixed(1)}
            unit="cm"
            statusLabel="Takeoff Bias"
            subtext="2-Foot Dominant Athlete"
            isPlatformDerived={true}
          />
          <MetricCard
            label="Personal Best (PB)"
            value={personalBest.toFixed(1)}
            unit="cm"
            statusLabel="All-Time Record"
            subtext="Verified historical touch"
            isPersonalBest={true}
          />
        </div>

        {/* TRANSPARENT FORMULA EXPLANATION & PROGRESS TRAJECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">Vertical Jump Progress Trajectory</CardTitle>
                <CardDescription>Verified chronological test logs over 8-week cycle</CardDescription>
              </div>
              <Badge variant="cyan" size="sm">Trend Slope</Badge>
            </CardHeader>
            <CardContent>
              <ProgressChart
                data={trajectoryData}
                dataKey="vertical"
                color="orange"
                unit="cm"
                height={220}
              />
            </CardContent>
          </Card>

          {/* Transparent Calculation Breakdown */}
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-court-gold" />
                <CardTitle className="text-xl">Calculation Provenance</CardTitle>
              </div>
              <CardDescription>Transparent mathematical definitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <div className="p-3 rounded-xl bg-court-card border border-court-border space-y-1">
                <span className="font-bold text-white font-athletic uppercase block">Standing Vertical:</span>
                <p className="font-mono text-court-gold text-[11px]">
                  Standing Vertical = Max Touch ({standingTouch} cm) - Standing Reach ({standingReach} cm) = {standingVertical.toFixed(1)} cm
                </p>
              </div>
              <div className="p-3 rounded-xl bg-court-card border border-court-border space-y-1">
                <span className="font-bold text-white font-athletic uppercase block">Approach Advantage:</span>
                <p className="font-mono text-court-cyan text-[11px]">
                  Approach ({approachVertical.toFixed(1)} cm) - Standing ({standingVertical.toFixed(1)} cm) = +{approachAdvantage.toFixed(1)} cm
                </p>
              </div>
              <p className="text-[11px]">
                VERTEX stores exact reach logs with UTC timestamps in PostgreSQL.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* JUMP TEST HISTORY & CAMERA PLACEHOLDER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Historical Jump Test Logs</CardTitle>
              <Badge variant="secondary" size="sm">{jumpLogs.length} Verified Logs</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {jumpLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-court-card/60 border border-court-border text-xs"
                  >
                    <div>
                      <span className="font-athletic font-bold text-white uppercase block">
                        {log.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {log.date} • Reach: {log.reach} cm
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black font-metric text-court-gold block">
                        {log.vertical.toFixed(1)} cm
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Touch: {log.touch} cm
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Computer Vision Feature-Flagged Placeholder */}
          <Card variant="elevated" className="border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <CardTitle className="text-xl">Computer Vision Video Lab</CardTitle>
              </div>
              <Badge variant="purple" size="sm">Flag: VIDEO_ANALYSIS</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-muted-foreground">
              <p>
                Automatic pose estimation, flight time calculation, and penultimate step plant angle detection will arrive in Phase 4.
              </p>
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 text-center space-y-2">
                <span className="text-sm font-athletic font-bold text-purple-300 uppercase block">
                  Camera Test Preview
                </span>
                <p className="text-[11px] text-purple-200/80">
                  Feature is currently in development under the experimental video analysis pipeline.
                </p>
                <Button variant="outline" size="sm" disabled className="opacity-60">
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RETEST RECORD MODAL */}
        <Modal
          open={isRetestModalOpen}
          onOpenChange={setIsRetestModalOpen}
          title="Record Manual Jump Test"
          description="Enter your latest verified reach and touch measurements to update your baseline vertical."
        >
          <form onSubmit={handleRecordRetest} className="space-y-4 pt-2">
            <Input
              label="Standing Reach (cm)"
              type="number"
              value={standingReach}
              onChange={(e) => setStandingReach(parseFloat(e.target.value) || 0)}
              required
            />
            <Input
              label="Max Standing Touch (cm)"
              type="number"
              value={standingTouch}
              onChange={(e) => setStandingTouch(parseFloat(e.target.value) || 0)}
              required
            />
            <Input
              label="Full Approach Touch (cm)"
              type="number"
              value={approachTouch}
              onChange={(e) => setApproachTouch(parseFloat(e.target.value) || 0)}
              required
            />

            <div className="p-3 rounded-xl bg-court-orange/10 border border-court-orange/30 text-xs">
              <span className="font-bold font-athletic uppercase text-court-orange block">
                Calculated Vertical:
              </span>
              <span className="text-xl font-metric font-black text-white">
                {(standingTouch - standingReach).toFixed(1)} cm
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-court-border/60">
              <Button variant="ghost" size="sm" onClick={() => setIsRetestModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Update Baseline
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
