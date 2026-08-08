"use client";

import React from "react";
import Link from "next/link";
import { Layers, Calendar, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function ProgramSchedulePage() {
  const phases = [
    {
      id: "p1",
      number: "1",
      title: "Foundation & Tendon Stiffness",
      weeks: "Weeks 1–2",
      status: "CURRENT",
      progress: 75,
      description: "Low-amplitude pogo hops, isometric split squats, landing mechanics, and ankle stiffness.",
    },
    {
      id: "p2",
      number: "2",
      title: "Strength & Kinetic Elasticity",
      weeks: "Weeks 3–4",
      status: "UPCOMING",
      progress: 0,
      description: "Trap-bar speed deadlifts, loaded jumps, eccentric hamstring force, and SSC loading.",
    },
    {
      id: "p3",
      number: "3",
      title: "Power Development (RFD)",
      weeks: "Weeks 5–6",
      status: "UPCOMING",
      progress: 0,
      description: "Rate of Force Development, contrast plyometrics, drop jumps, and max explosive takeoff.",
    },
    {
      id: "p4",
      number: "4",
      title: "Max Jump Expression & Deload",
      weeks: "Weeks 7–8",
      status: "UPCOMING",
      progress: 0,
      description: "Full running approach conversion, penultimate step plant angle, and rim attack execution.",
    },
  ];

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="gold">Deterministic Periodization</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                8-Week Progressive Block
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              8-Week Program Schedule
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Structured progressive overload designed to protect joints while maximizing vertical propulsion.
            </p>
          </div>

          <Link href="/workout">
            <Button variant="primary" size="sm" className="shadow-glow-orange" leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}>
              Open Today&apos;s Workout
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {phases.map((phase) => (
            <Card
              key={phase.id}
              variant={phase.status === "CURRENT" ? "glow" : "glass"}
              className={phase.status === "CURRENT" ? "border-court-orange" : ""}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={phase.status === "CURRENT" ? "orange" : "secondary"} size="sm">
                      {phase.weeks}
                    </Badge>
                    {phase.status === "CURRENT" && (
                      <span className="text-xs font-athletic font-bold text-court-orange animate-pulse">
                        ● ACTIVE PHASE
                      </span>
                    )}
                  </div>
                  <h3 className="font-athletic text-2xl font-black text-white uppercase tracking-tight">
                    {phase.title}
                  </h3>
                </div>

                {phase.status === "CURRENT" ? (
                  <Link href="/workout">
                    <Button variant="primary" size="sm">
                      Execute Session
                    </Button>
                  </Link>
                ) : (
                  <Badge variant="outline">Scheduled</Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {phase.description}
              </p>

              {phase.status === "CURRENT" && (
                <ProgressBar
                  value={phase.progress}
                  color="orange"
                  size="sm"
                  label="Phase Completion"
                  showPercentage
                />
              )}
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
