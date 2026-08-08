"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Activity, Dumbbell, ShieldCheck, Target, Sparkles, Layers } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Athlete & Safety Onboarding",
      desc: "Provide body dimensions, basketball schedule, training history, equipment availability, and complete our musculoskeletal safety screen to filter contraindications.",
      icon: ShieldCheck,
      color: "text-court-cyan",
    },
    {
      num: "02",
      title: "Athletic Profile & Target Goals",
      desc: "Define your competitive basketball goals, target vertical milestones, and schedule availability with transparent progress tracking.",
      icon: Target,
      color: "text-court-gold",
    },
    {
      num: "03",
      title: "Deterministic 8-Week Periodization",
      desc: "Our Java rule engine structures an 8-week program tailored to your phase: Foundation, Strength + Elasticity, Power Development, or Max Jump Expression.",
      icon: Layers,
      color: "text-court-orange",
    },
    {
      num: "04",
      title: "Court-Side Daily Workout Execution",
      desc: "Execute workouts on your mobile device in the gym, log set completions, track rest intervals with vibration alerts, and capture post-session RPE and joint soreness.",
      icon: Dumbbell,
      color: "text-emerald-400",
    },
    {
      num: "05",
      title: "Constrained AI Coach Synthesis",
      desc: "Review weekly progress trends and explainable biomechanical rationales without unconstrained chatbots mutating core safety prescriptions.",
      icon: Sparkles,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="orange" className="mb-4">End-to-End Workflow</Badge>
          <h1 className="text-4xl sm:text-6xl font-black font-athletic tracking-tight uppercase mb-4">
            How VERTEX Works
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            From baseline manual jump measurements to daily court-side workout execution.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.num} variant="glass" className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="font-mono text-3xl font-black text-court-orange shrink-0">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-court-card border border-court-border flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-athletic text-2xl font-black text-white uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/register">
            <Button variant="primary" size="lg" className="shadow-glow-orange font-black">
              START YOUR ASSESSMENT
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
