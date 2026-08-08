"use client";

import React, { useState } from "react";
import { HeartPulse, Moon, Zap, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ReadinessCard } from "@/components/ui/ReadinessCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function RecoveryPage() {
  const [sleepHours, setSleepHours] = useState(8.2);
  const [soreness, setSoreness] = useState(2);
  const [fatigue, setFatigue] = useState(3);
  const [isLoggedToday, setIsLoggedToday] = useState(true);

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="cyan">Circadian & CNS Monitoring</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Non-clinical Athletic Recovery
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Recovery & Readiness
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Daily sleep, neuromuscular fatigue, and tendon soreness capture to prevent overtraining.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Readiness Display Card */}
          <ReadinessCard
            score={88}
            category="OPTIMAL"
            sleepHours={sleepHours}
            sorenessScore={soreness}
            fatigueScore={fatigue}
          />

          {/* Daily Check-in Form Card */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-xl">Daily Athlete Check-in</CardTitle>
              <CardDescription>Log morning sleep duration and musculoskeletal state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Sleep Duration (Hours)"
                type="number"
                step="0.1"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseFloat(e.target.value) || 0)}
                leftIcon={<Moon className="w-4 h-4 text-sky-400" />}
              />

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-athletic">
                  Joint / Tendon Soreness (1-10): <strong className="text-court-gold">{soreness}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={soreness}
                  onChange={(e) => setSoreness(parseInt(e.target.value))}
                  className="w-full accent-court-orange cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-athletic">
                  Overall CNS Fatigue (1-10): <strong className="text-court-cyan">{fatigue}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={fatigue}
                  onChange={(e) => setFatigue(parseInt(e.target.value))}
                  className="w-full accent-court-cyan cursor-pointer"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full shadow-glow-orange"
                onClick={() => setIsLoggedToday(true)}
              >
                {isLoggedToday ? "Update Today's Recovery Log" : "Submit Recovery Check-in"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
