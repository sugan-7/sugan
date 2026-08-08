import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <Badge variant="gold" className="mb-4">Complete Athlete Journey</Badge>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mb-6">
          How VERTEX Works
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-12 text-base">
          From manual jump measurements to daily court-ready workouts, explore the end-to-end athlete workflow.
        </p>

        <div className="relative border-l-2 border-border pl-6 ml-4 space-y-12">
          <div className="relative">
            <div className="absolute -left-[33px] top-1 h-5 w-5 rounded-full bg-court-gold border-4 border-background" />
            <h3 className="text-xl font-bold text-foreground">Step 1: Athlete & Safety Onboarding</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Provide body metrics, basketball schedule, training history, equipment availability, and complete our safety screen to identify movement restrictions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[33px] top-1 h-5 w-5 rounded-full bg-court-gold border-4 border-background" />
            <h3 className="text-xl font-bold text-foreground">Step 2: Jump Lab Manual Assessment</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Record your standing reach, max standing touch, approach touch, and 1-foot / 2-foot jump styles. We compute your Standing Vertical and Approach Advantage transparently.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[33px] top-1 h-5 w-5 rounded-full bg-court-gold border-4 border-background" />
            <h3 className="text-xl font-bold text-foreground">Step 3: Deterministic Program Generation</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Our rule engine structures an 8-week program tailored to your phase: Foundation, Strength + Elasticity, Power Development, or Jump Expression.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[33px] top-1 h-5 w-5 rounded-full bg-court-gold border-4 border-background" />
            <h3 className="text-xl font-bold text-foreground">Step 4: Daily Training & Recovery Tracking</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Execute workouts on your mobile device, log set completions, track rest intervals, and rate your session RPE and daily recovery readiness.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/register">
            <Button variant="primary" size="lg">
              Begin Assessment
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
