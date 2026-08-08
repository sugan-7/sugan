"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, HeartPulse, Activity, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="orange" className="mb-4">Sports Performance Science</Badge>
          <h1 className="text-4xl sm:text-6xl font-black font-athletic tracking-tight uppercase mb-4">
            Evidence-Informed Principles
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            VERTEX applies validated neuromuscular biomechanics to basketball vertical jump development. We eliminate arbitrary internet gimmicks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-court-orange" />
                <CardTitle>1. Stretch-Shortening Cycle (SSC)</CardTitle>
              </div>
              <CardDescription>
                Fast SSC (&lt;250ms) vs Slow SSC (&gt;250ms)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                In basketball approach jumps, kinetic energy is transferred rapidly through the patellar and Achilles tendons. Our engine trains tendon compliance and stiffness sequentially to store maximum elastic energy without excessive muscle fatigue.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-court-gold" />
                <CardTitle>2. Rate of Force Development (RFD)</CardTitle>
              </div>
              <CardDescription>
                Time-to-Peak-Force vs Absolute Strength
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                A basketball takeoff window is less than 0.3 seconds. Producing force rapidly is more critical than slow maximal lifting. We integrate accelerative speed deadlifts and contrast drop jumps.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-court-cyan" />
                <CardTitle>3. Tendon Health & Joint Safety</CardTitle>
              </div>
              <CardDescription>
                Progressive Tendon Adaptation & Deceleration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                Tendons adapt more slowly than skeletal muscle. We use isometric loading protocols (e.g. split squats) to promote collagen cross-linking and protect knees during intense basketball schedules.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <CardTitle>4. Workload Fatigue Management</CardTitle>
              </div>
              <CardDescription>
                Session RPE & Basketball Game Spacing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                A heavy 5v5 full-court scrimmage expends significant central nervous system reserve. VERTEX balances plyometric intensity around your game schedule to prevent overtraining.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/register">
            <Button variant="primary" size="lg" className="shadow-glow-orange">
              Begin Your Assessment
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
