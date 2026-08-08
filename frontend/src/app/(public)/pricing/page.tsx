"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Video, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">Platform Roadmap</Badge>
          <h1 className="text-4xl sm:text-6xl font-black font-athletic tracking-tight uppercase mb-4">
            Transparent Platform Access
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            VERTEX is currently deploying Phase 0 & 1 foundations. Phase 2 unlocks full MVP athlete onboarding and daily workout execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Active MVP Tier */}
          <Card variant="glass" className="p-8 border-court-orange/40 shadow-glow-orange">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="orange">Phase 1 & 2 Active</Badge>
              <span className="text-xs font-mono font-bold text-court-orange">Free in Early Access</span>
            </div>
            <h3 className="font-athletic text-3xl font-black text-white uppercase mb-2">
              Athlete Foundation Tier
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Complete athletic profile assessment, vertical progress analytics, and deterministic 8-week periodized program.
            </p>
            <div className="space-y-3 text-xs text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-court-orange" />
                <span>Standing Reach, Standing Vertical, Approach Advantage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-court-orange" />
                <span>Mobile Workout Player with Rest Timers & Cues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-court-orange" />
                <span>PostgreSQL Authoritative Log Persistence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-court-orange" />
                <span>Constrained AI Coach Explanations</span>
              </div>
            </div>
            <Link href="/register" className="block">
              <Button variant="primary" size="lg" className="w-full shadow-glow-orange">
                Start Your Assessment
              </Button>
            </Link>
          </Card>

          {/* Future Pro Tier */}
          <Card variant="glass" className="p-8 border-purple-500/30 opacity-90">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="purple">Roadmap Phase 4</Badge>
              <span className="text-xs font-mono text-purple-300">Coming Soon</span>
            </div>
            <h3 className="font-athletic text-3xl font-black text-white uppercase mb-2">
              Computer Vision Pro Tier
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              On-device camera pose estimation, flight time jump calculation, and coach team rosters.
            </p>
            <div className="space-y-3 text-xs text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Pose Estimation & Flight Time Flight Physics</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Penultimate Plant Angle Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Team Coach Multi-Athlete Management</span>
              </div>
            </div>
            <Button variant="outline" size="lg" className="w-full" disabled>
              Feature-Flagged (Phase 4)
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
