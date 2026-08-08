"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Flame,
  Dumbbell,
  ShieldCheck,
  ChevronRight,
  Target,
  Clock,
  Sparkles,
  Layers,
  HeartPulse,
  Video,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressChart } from "@/components/ui/ProgressChart";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  const loopSteps = [
    { label: "1. ASSESS", desc: "Standing reach, approach style, basketball workload, safety screen." },
    { label: "2. ANALYZE", desc: "Standing vertical, approach advantage, kinetic conversion index." },
    { label: "3. PLAN", desc: "8-week deterministic periodization across 4 progressive phases." },
    { label: "4. TRAIN", desc: "Mobile court-side workout player with rest timers and cues." },
    { label: "5. MEASURE", desc: "Transparent jump re-tests with zero fabricated PRs." },
    { label: "6. RECOVER", desc: "Daily sleep, soreness, and CNS readiness tracking." },
    { label: "7. ADAPT", desc: "Deterministic volume adjustment based on game fatigue." },
  ];

  const sampleTrajectory = [
    { date: "W1 Test", vertical: 68 },
    { date: "W3 Log", vertical: 70 },
    { date: "W5 Mid", vertical: 72.5 },
    { date: "W7 Peak", vertical: 75 },
    { date: "W8 PB", vertical: 77 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground selection:bg-court-orange selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO SECTION
        ========================================================================= */}
        <section className="relative overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36 border-b border-court-border/80 bg-radial-gradient">
          <div className="absolute inset-0 bg-court-grid opacity-30 pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge variant="orange" size="md">
                Deterministic Basketball Training Engine v2.1
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black font-athletic tracking-tight text-white leading-[0.95] mb-6"
            >
              HOW HIGH CAN <br />
              <span className="text-gradient-fire">YOU GO?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Personalized basketball performance training built around your body, your goals and your progress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-glow-orange">
                  START YOUR ASSESSMENT
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  EXPLORE HOW IT WORKS
                </Button>
              </Link>
            </motion.div>

            {/* Assessment Metric Teaser Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 text-left"
            >
              <MetricCard
                label="Standing Vertical"
                value={null}
                unit="cm"
                statusLabel="Reach Test"
                subtext="Standing Touch - Reach"
              />
              <MetricCard
                label="Approach Advantage"
                value={null}
                unit="cm"
                statusLabel="Elasticity"
                subtext="Approach - Standing"
              />
              <MetricCard
                label="Training Readiness"
                value={null}
                statusLabel="CNS Load"
                subtext="Sleep & Soreness"
              />
              <MetricCard
                label="Goal Gap"
                value={null}
                unit="cm"
                statusLabel="Rim Target"
                subtext="Target - Baseline"
              />
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE ATHLETE PROBLEM
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="rose" className="mb-3">The Problem With Generic Apps</Badge>
              <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase">
                Generic Vertical Programs Ignore Basketball Demands
              </h2>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Random internet PDF programs force high-impact plyometrics onto fatigued knees after a 40-minute pickup game, risking patellar tendinopathy without progressive overload.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass" className="border-rose-500/20 hover:border-rose-500/40">
                <CardHeader>
                  <span className="text-rose-400 font-mono text-2xl font-black mb-2">01</span>
                  <CardTitle>Zero Workload Awareness</CardTitle>
                  <CardDescription>
                    A heavy competitive game or team scrimmage taxes the central nervous system. Generic apps prescribe max-effort jumps without accounting for court volume.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass" className="border-rose-500/20 hover:border-rose-500/40">
                <CardHeader>
                  <span className="text-rose-400 font-mono text-2xl font-black mb-2">02</span>
                  <CardTitle>Hallucinated AI Workouts</CardTitle>
                  <CardDescription>
                    Unconstrained LLM chatbots invent arbitrary exercises on the fly with no tendon safety filters, phase periodization, or contraindication checks.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass" className="border-rose-500/20 hover:border-rose-500/40">
                <CardHeader>
                  <span className="text-rose-400 font-mono text-2xl font-black mb-2">03</span>
                  <CardTitle>Fabricated Outcomes</CardTitle>
                  <CardDescription>
                    Unscientific promises claiming &ldquo;Gain 10 inches in 4 weeks&rdquo; disregard individual tendon stiffness, takeoff biomechanics, and biological adaptation rates.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: HOW VERTEX WORKS (7-STEP CONTINUOUS LOOP)
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-charcoal/30 relative">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="gold" className="mb-3">Closed-Loop Architecture</Badge>
              <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase">
                The VERTEX Continuous Performance Loop
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm font-mono mt-3 uppercase tracking-wider text-court-orange">
                Assess → Analyze → Plan → Train → Measure → Recover → Adapt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {loopSteps.map((step, idx) => (
                <div
                  key={step.label}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl glass-panel border transition-all cursor-pointer flex flex-col justify-between ${
                    activeStep === idx
                      ? "border-court-orange bg-court-orange/10 shadow-glow-orange"
                      : "border-court-border hover:border-court-border/80"
                  }`}
                >
                  <span className="text-xs font-black font-athletic text-court-gold block mb-1">
                    {step.label}
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ATHLETE ASSESSMENT PREVIEW
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="cyan" className="mb-3">Precision Baseline</Badge>
                <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase mb-4">
                  Multi-Vector Athlete Assessment
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  We don&apos;t guess your training needs. Our 8-step onboarding captures your physical dimensions, standing reach, basketball competitive schedule, resistance experience, and movement contraindications.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-court-card border border-court-border">
                    <ShieldCheck className="w-5 h-5 text-court-cyan shrink-0" />
                    <span className="text-xs font-athletic font-bold uppercase text-white">
                      Knee, Ankle & Back Safety Screening Filter
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-court-card border border-court-border">
                    <Target className="w-5 h-5 text-court-gold shrink-0" />
                    <span className="text-xs font-athletic font-bold uppercase text-white">
                      1-Foot vs. 2-Foot Takeoff Preference Profiling
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-court-card border border-court-border">
                    <Clock className="w-5 h-5 text-court-orange shrink-0" />
                    <span className="text-xs font-athletic font-bold uppercase text-white">
                      Basketball Practice & Game Spacing Integration
                    </span>
                  </div>
                </div>
              </div>

              {/* Assessment Card Mockup */}
              <div className="p-6 rounded-3xl bg-court-charcoal border border-court-border/80 glass-panel-elevated space-y-4">
                <div className="flex items-center justify-between border-b border-court-border/60 pb-3">
                  <span className="text-xs font-athletic font-bold uppercase text-court-orange">
                    Assessment Step 5 of 8
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Jump Profile</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-court-card border border-court-border">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                      Standing Reach
                    </span>
                    <span className="text-xl font-metric font-black text-white">242.0 cm</span>
                  </div>
                  <div className="p-3 rounded-xl bg-court-card border border-court-border">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                      Max Touch
                    </span>
                    <span className="text-xl font-metric font-black text-court-gold">314.0 cm</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-court-orange/10 border border-court-orange/30">
                  <span className="text-[10px] font-bold uppercase text-court-orange block font-athletic">
                    Calculated Baseline Vertical
                  </span>
                  <span className="text-2xl font-metric font-black text-white">72.0 cm</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5 font-mono">
                    Formula: 314.0 cm (Touch) - 242.0 cm (Reach)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PERSONALIZED PROGRAM PREVIEW
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-charcoal/30">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="gold" className="mb-3">Deterministic Periodization</Badge>
              <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase">
                4-Phase Science-Backed Program
              </h2>
              <p className="text-muted-foreground text-sm mt-3">
                No random workouts. An 8-week structured roadmap engineered for basketball kinetic chain potentiation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card variant="glass">
                <CardHeader>
                  <Badge variant="orange" size="sm" className="w-fit mb-2">Weeks 1-2</Badge>
                  <CardTitle>Phase 1: Foundation</CardTitle>
                  <CardDescription>
                    Tendon stiffness, isometric stabilization, ankle stiffness, landing mechanics, and landing deceleration.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <Badge variant="gold" size="sm" className="w-fit mb-2">Weeks 3-4</Badge>
                  <CardTitle>Phase 2: Strength</CardTitle>
                  <CardDescription>
                    Force absorption, posterior chain torque, trap-bar deadlift, and elastic stretch-shortening cycle (SSC).
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <Badge variant="cyan" size="sm" className="w-fit mb-2">Weeks 5-6</Badge>
                  <CardTitle>Phase 3: Power (RFD)</CardTitle>
                  <CardDescription>
                    Rate of Force Development, contrast training, loaded jumps, and explosive triple extension.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <Badge variant="emerald" size="sm" className="w-fit mb-2">Weeks 7-8</Badge>
                  <CardTitle>Phase 4: Expression</CardTitle>
                  <CardDescription>
                    Maximal approach jump expression, penultimate step conversion, rim attack, and deload tapering.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: DAILY WORKOUT EXPERIENCE
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mobile Workout Screen Mockup */}
              <div className="rounded-3xl p-6 bg-court-charcoal border-2 border-court-border glass-panel-elevated space-y-4 max-w-md mx-auto lg:mx-0 w-full shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-court-border/60">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-court-orange font-athletic">
                      Live Gym Session
                    </span>
                    <h4 className="font-athletic text-xl font-black text-white uppercase">
                      RFD Potentiation A
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">
                    Set 2 of 4
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-court-card border border-court-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-athletic text-base font-bold text-white uppercase">
                      Depth Jump to Rim Touch
                    </span>
                    <Badge variant="orange" size="sm">4 reps</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    &ldquo;Minimize ground contact time under 0.20s. Explode vertically immediately.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-court-gold/40 text-center">
                  <span className="text-[10px] uppercase font-bold text-court-gold font-athletic block">
                    Rest Timer
                  </span>
                  <span className="text-4xl font-metric font-black text-white">01:30</span>
                </div>

                <Button variant="primary" size="md" className="w-full">
                  Complete Set 2 & Start Rest
                </Button>
              </div>

              <div>
                <Badge variant="orange" className="mb-3">Court-Side Optimized</Badge>
                <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase mb-4">
                  Built for Court & Gym Execution
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  No complex forms in the middle of a workout. Large touch targets, automatic rest timers, offline sync tolerance, and immediate RPE feedback let you focus on athletic intensity.
                </p>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-orange" />
                    <span>One-tap set completion with automatic rest countdowns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-orange" />
                    <span>Actionable coaching cues for takeoff biomechanics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-orange" />
                    <span>Session RPE (1-10) and musculoskeletal soreness logging</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>



        {/* =========================================================================
            SECTION 8: PROGRESS ANALYTICS
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="emerald" className="mb-3">Data-Driven Analytics</Badge>
                <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase mb-4">
                  Visual Trajectory & Adaptation Slopes
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Track your vertical jump progression, training volume adherence, and strength development over your entire 8-week cycle with high-contrast performance charts.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-court-card border border-court-border">
                    <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
                      Vertical Slope
                    </span>
                    <span className="text-lg font-metric font-black text-emerald-400">+1.1 cm / wk</span>
                  </div>
                  <div className="p-4 rounded-xl bg-court-card border border-court-border">
                    <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
                      Program Adherence
                    </span>
                    <span className="text-lg font-metric font-black text-white">94% Target</span>
                  </div>
                </div>
              </div>

              {/* Trajectory Chart Preview */}
              <div>
                <ProgressChart
                  data={sampleTrajectory}
                  dataKey="vertical"
                  color="orange"
                  title="Vertical Jump Progress Trajectory"
                  unit="cm"
                  height={260}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: AI COACH EXPLANATION PREVIEW
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-charcoal/30">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="p-6 rounded-3xl bg-court-charcoal border border-court-border glass-panel-elevated space-y-4">
                <div className="flex items-center justify-between border-b border-court-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-court-gold" />
                    <span className="font-athletic text-base font-black text-white uppercase">
                      VERTEX AI Coach
                    </span>
                  </div>
                  <Badge variant="gold" size="sm">Constrained Rationale</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-court-card border border-court-border space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-bold text-foreground font-athletic uppercase">
                    Weekly Synthesis Analysis:
                  </p>
                  <p>
                    &ldquo;Your approach advantage is currently 5.0 cm, indicating good kinetic conversion. However, your session RPE spiked to 8.5 after yesterday&apos;s scrimmage. Today&apos;s volume is kept at 3 sets of depth drops to protect your patellar tendon.&rdquo;
                  </p>
                </div>

                <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-court-gold" />
                  <span>Rule Engine Protected: AI cannot alter core safety prescriptions.</span>
                </div>
              </div>

              <div>
                <Badge variant="gold" className="mb-3">Explainable Intelligence</Badge>
                <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase mb-4">
                  Constrained AI Coach Explanations
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Unlike unpredictable chatbots, the VERTEX AI Coach operates under strict boundaries. It explains the scientific rationale behind your workouts and synthesizes weekly trends without hallucinating prescriptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FUTURE COMPUTER-VISION ANALYSIS
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-court-charcoal/80 border border-purple-500/30 glass-panel relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="purple">Future Capability</Badge>
                    <span className="text-xs font-mono text-purple-300">Feature Flag: VIDEO_ANALYSIS</span>
                  </div>
                  <h3 className="font-athletic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    Computer-Vision Jump Pose Estimation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                    Automatic vertical jump calculation from your mobile camera with flight-time physics and penultimate step angle detection.
                  </p>
                </div>
                <Badge variant="outline" size="md">Coming Soon</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-court-card/60 border border-court-border/40">
                  <Video className="w-5 h-5 text-purple-400 mb-2" />
                  <h5 className="font-athletic font-bold text-white uppercase mb-1">Flight Time Detection</h5>
                  <p className="text-muted-foreground text-[11px]">Calculates hang time (t) and vertical height = 1/2 * g * (t/2)^2.</p>
                </div>
                <div className="p-4 rounded-xl bg-court-card/60 border border-court-border/40">
                  <Activity className="w-5 h-5 text-purple-400 mb-2" />
                  <h5 className="font-athletic font-bold text-white uppercase mb-1">Penultimate Plant Angle</h5>
                  <p className="text-muted-foreground text-[11px]">Analyzes shin angle and plant foot braking force efficiency.</p>
                </div>
                <div className="p-4 rounded-xl bg-court-card/60 border border-court-border/40">
                  <Cpu className="w-5 h-5 text-purple-400 mb-2" />
                  <h5 className="font-athletic font-bold text-white uppercase mb-1">On-Device Processing</h5>
                  <p className="text-muted-foreground text-[11px]">Private video processing without raw footage upload to public servers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: EVIDENCE-INFORMED TRAINING PRINCIPLES
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-charcoal/30">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="orange" className="mb-3">Biomechanical Principles</Badge>
              <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase">
                Grounded in Sports Science
              </h2>
              <p className="text-muted-foreground text-sm mt-3">
                No gimmicks or fad training. The VERTEX engine is built on validated athletic development principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Tendon Stiffness & SSC</CardTitle>
                  <CardDescription>
                    The Achilles tendon and patellar tendon act as biological springs. Rapid stretch-shortening cycles (SSC) increase force return by storing elastic energy.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Rate of Force Development</CardTitle>
                  <CardDescription>
                    A basketball takeoff lasts only 0.15–0.30 seconds. Max strength alone is insufficient; RFD trains the nervous system to recruit motor units in milliseconds.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Workload & CNS Management</CardTitle>
                  <CardDescription>
                    High-intensity jumps require fresh motor units. We monitor weekly basketball game volume to prevent chronic fatigue and overtraining syndrome.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: FUTURE PRICING & ROADMAP
        ========================================================================= */}
        <section className="py-24 border-b border-court-border/80 bg-court-obsidian">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="gold" className="mb-3">Platform Access</Badge>
              <h2 className="text-3xl sm:text-5xl font-black font-athletic tracking-tight uppercase">
                Phase Roadmap & Pricing
              </h2>
              <p className="text-muted-foreground text-sm mt-3">
                VERTEX is currently deploying Phase 0 & 1 foundations. Phase 2 opens early athlete access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Foundation Tier */}
              <Card variant="glass" className="p-8 border-court-border">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="gold">Phase 1 & 2 Active</Badge>
                  <span className="text-xs font-mono text-muted-foreground">Free During MVP</span>
                </div>
                <h3 className="font-athletic text-3xl font-black text-white uppercase mb-2">
                  Athlete Foundation
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Complete athletic profile assessment, deterministic 8-week periodized program, and recovery analytics.
                </p>
                <div className="space-y-3 text-xs text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-gold" />
                    <span>Standing & Approach Jump Calculations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-gold" />
                    <span>Mobile Workout Player with Rest Timers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-court-gold" />
                    <span>PostgreSQL Authoritative History</span>
                  </div>
                </div>
                <Link href="/register" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    Start Assessment Now
                  </Button>
                </Link>
              </Card>

              {/* Elite Pro Tier (Roadmap) */}
              <Card variant="glass" className="p-8 border-purple-500/30 opacity-90">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="purple">Roadmap Phase 3/4</Badge>
                  <span className="text-xs font-mono text-purple-300">Future Tier</span>
                </div>
                <h3 className="font-athletic text-3xl font-black text-white uppercase mb-2">
                  Elite Performance Lab
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Computer vision video jump analysis, automated flight time detection, and AI Coach multi-cycle synthesis.
                </p>
                <div className="space-y-3 text-xs text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>On-Device Video Pose Estimation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Penultimate Step Plant Angle Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Coach Dashboard & Team Roster Portals</span>
                  </div>
                </div>
                <Button variant="outline" size="md" className="w-full" disabled>
                  Coming Soon in Phase 4
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FINAL CTA STRIP
        ========================================================================= */}
        <section className="py-20 bg-gradient-to-r from-court-card via-court-charcoal to-secondary text-center border-b border-court-border/80 relative">
          <div className="container mx-auto px-4 max-w-3xl">
            <h3 className="text-3xl sm:text-5xl font-black font-athletic text-white uppercase tracking-tight mb-4">
              Ready to Discover Your True Reach?
            </h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Complete your multi-step athlete profile, screen for safety, and receive a deterministic 8-week basketball athletic development program.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" className="shadow-glow-orange font-black">
                START YOUR ASSESSMENT
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
